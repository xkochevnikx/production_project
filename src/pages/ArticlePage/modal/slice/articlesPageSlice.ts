import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProviders';
import { ArticleView, IArticle } from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';
import {
    ArticleSortField,
    ArticleType,
} from 'entities/Article/modal/types/article';
import { SortOrder } from 'shared/types';
import { IArticlesPageSchema } from '../types/articlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<IArticle>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<IStateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<IArticlesPageSchema>({
        isLoading: false,
        error: '',
        view: ArticleView.SMALL,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        inited: false,
        limit: 9,
        order: 'asc',
        search: '',
        sort: ArticleSortField.CREATED,
        type: ArticleType.ALL,
    }),

    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
                action.payload
            );
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },

        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },

        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },

        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY
            ) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            state.inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.setMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer } = articlesPageSlice;
export const { actions: articlesPageActions } = articlesPageSlice;
