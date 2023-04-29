// import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
// import { ArticleView } from 'entities/Article';
// import { ArticleSortField } from 'entities/Article/modal/types/article';
// import { initArticlesPage } from './initArticlesPage';
// import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
// import { articlesPageActions } from '../../slice/articlesPageSlice';

// jest.mock('../fetchArticlesList/fetchArticlesList');

// describe('initArticlesPage.test', () => {
//     test('success', async () => {
//         const thunk = new TestAsyncThunk(initArticlesPage, {
//             articlesPage: {
//                 error: '',
//                 view: ArticleView.SMALL,
//                 ids: [],
//                 entities: {},
//                 page: 1,
//                 hasMore: true,
//                 isLoading: false,
//                 inited: false,
//                 limit: 4,
//                 order: 'asc',
//                 search: '',
//                 sort: ArticleSortField.CREATED,
//             },
//         });

//         await thunk.callThunk();
//         expect(thunk.dispatch).toBeCalledTimes(4);
//         expect(fetchArticlesList).toBeCalled();
//         expect(fetchArticlesList).toHaveBeenCalledWith({ page: 1 });
//         expect(thunk.dispatch).toHaveBeenCalledWith(
//             articlesPageActions.initState()
//         );
//     });

//     test('fetchArticlesList not called isLoading', async () => {
//         const thunk = new TestAsyncThunk(initArticlesPage, {
//             articlesPage: {
//                 error: '',
//                 view: ArticleView.SMALL,
//                 ids: [],
//                 entities: {},
//                 page: 1,
//                 hasMore: true,
//                 isLoading: false,
//                 inited: true,
//                 limit: 4,
//                 order: 'asc',
//                 search: '',
//                 sort: ArticleSortField.CREATED,
//             },
//         });

//         await thunk.callThunk({});
//         expect(thunk.dispatch).toBeCalledTimes(2);
//         expect(fetchArticlesList).not.toBeCalled();
//     });
// });
