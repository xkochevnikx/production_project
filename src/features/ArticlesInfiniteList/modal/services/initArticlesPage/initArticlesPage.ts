import { createAsyncThunk } from '@reduxjs/toolkit';
import { URLSearchParams } from 'url';
import { IThunkConfig } from '@/app/providers/StoreProviders';
import { SortOrder } from '@/shared/types';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { getArticlesPageInited } from '../../selectors/getArticlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    IThunkConfig<string>
>(
    'articlesPage/initArticlesPage',
    async (searchParams: URLSearchParams, thunkApi) => {
        //! флаг инитед говорит что страница статей уже инициализирована, первый запрос сделан, и делать его при каждом посещении страницы не нужно
        const inited = getArticlesPageInited(thunkApi.getState());
        //! после инициализации проходимся циклом по данным из адресной строки и обновляем поля. После уже в fetchArticlesList на основании этих полей делаем запрос данных на сервер
        if (!inited) {
            searchParams.forEach((value, key) => {
                switch (key) {
                case 'order':
                    thunkApi.dispatch(
                        articlesPageActions.setOrder(value as SortOrder),
                    );
                    break;
                case 'sort':
                    thunkApi.dispatch(
                        articlesPageActions.setSort(
                                value as ArticleSortField,
                        ),
                    );
                    break;
                case 'search':
                    thunkApi.dispatch(articlesPageActions.setSearch(value));
                    break;
                case 'type':
                    thunkApi.dispatch(
                        articlesPageActions.setType(value as ArticleType),
                    );
                    break;
                default:
                    throw new Error('Ошибка типов');
                }
            });
            //! обновили данные в полях и дальше инициалзируем вид из локала этим редюсером и дергаем запрос на статьи
            thunkApi.dispatch(articlesPageActions.initState());
            thunkApi.dispatch(fetchArticlesList({ replace: true }));
        }
    },
);
