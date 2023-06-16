import { testAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { ArticleView } from 'entities/Article';
import {
    ArticleSortField,
    ArticleType,
} from 'entities/Article/modal/types/article';
import { fetchArticlesList } from 'features/ArticlesInfiniteList/modal/services/fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock(
    'features/ArticlesInfiniteList/modal/services/fetchArticlesList/fetchArticlesList',
);

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = testAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                error: '',
                view: ArticleView.SMALL,
                ids: [],
                entities: {},
                page: 1,
                hasMore: true,
                isLoading: false,
                inited: false,
                limit: 4,
                order: 'asc',
                search: '',
                sort: ArticleSortField.CREATED,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(4);
    });

    test('fetchArticlesList not called', async () => {
        const thunk = testAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                error: '',
                view: ArticleView.SMALL,
                ids: [],
                entities: {},
                page: 1,
                hasMore: false,
                isLoading: false,
                inited: false,
                limit: 4,
                order: 'asc',
                search: '',
                sort: ArticleSortField.CREATED,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toBeCalled();
    });

    test('fetchArticlesList not called isLoading', async () => {
        const thunk = testAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                error: '',
                view: ArticleView.SMALL,
                ids: [],
                entities: {},
                page: 1,
                hasMore: true,
                isLoading: true,
                inited: false,
                limit: 4,
                order: 'asc',
                search: '',
                sort: ArticleSortField.CREATED,
                type: ArticleType.ALL,
            },
        });

        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toBeCalled();
    });
});
