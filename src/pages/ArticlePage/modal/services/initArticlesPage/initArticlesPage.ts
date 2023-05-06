import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkConfig } from 'app/providers/StoreProviders';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { getArticlesPageInited } from '../../selectors/getArticlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { URLSearchParams } from 'url';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    IThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams: URLSearchParams, thunkApi) => {
        const inited = getArticlesPageInited(thunkApi.getState());

        if (!inited) {
            searchParams.forEach((value, key) => {
                switch (key) {
                    case 'order':
                        thunkApi.dispatch(
                            articlesPageActions.setOrder(value as SortOrder)
                        );
                        break;
                    case 'sort':
                        thunkApi.dispatch(
                            articlesPageActions.setSort(
                                value as ArticleSortField
                            )
                        );
                        break;
                    case 'search':
                        thunkApi.dispatch(articlesPageActions.setSearch(value));
                        break;
                    case 'type':
                        thunkApi.dispatch(
                            articlesPageActions.setType(value as ArticleType)
                        );
                        break;
                    default:
                        throw new Error('Ошибка типов');
                }
            });

            thunkApi.dispatch(articlesPageActions.initState());
            thunkApi.dispatch(fetchArticlesList({}));
        }
    }
);
