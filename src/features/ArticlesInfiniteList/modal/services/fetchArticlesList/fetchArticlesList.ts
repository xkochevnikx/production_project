import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from '@/app/providers/StoreProviders';
import { ArticleType, IArticle } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/getArticlesPageSelectors';

//! этот флаг нужен для видимости в метаданных на обработке состояния фанка. если при вызове replace:true то это значит что это первый запрос и номер страницы 1 если не тру то значит в фанке fetchNextArticlesPage номер страницы увеличил и articlesAdapter будет добавлять новую порцию статей в конец уже отрисованных.
export interface IFetchArticleListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    IArticle[],
    IFetchArticleListProps,
    IThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkApi) => {
    const limit = getArticlesPageLimit(thunkApi.getState());
    const sort = getArticlesPageSort(thunkApi.getState());
    const order = getArticlesPageOrder(thunkApi.getState());
    const search = getArticlesPageSearch(thunkApi.getState());
    const page = getArticlesPageNum(thunkApi.getState());
    const type = getArticlesPageType(thunkApi.getState());

    const { extra, rejectWithValue } = thunkApi;

    //! функуция принимает объект из параметров которые получили из полей
    addQueryParams({
        sort,
        order,
        search,
        type,
    });

    try {
        const response = await extra.api.get<IArticle[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                q: search,
                _sort: sort,
                _order: order,
                type: type === ArticleType.ALL ? undefined : type,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        return rejectWithValue('error');
    }
});
