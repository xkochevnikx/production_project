import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { SortOrder } from '@/shared/types';
import { IStateSchema } from '@/app/providers/StoreProviders';
import {
    ArticleSortField,
    ArticleType,
    ArticleView,
    IArticle,
} from '@/entities/Article';
import { IArticlesPageSchema } from '../types/articlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

export const articlesAdapter = createEntityAdapter<IArticle>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<IStateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState = articlesAdapter.getInitialState<IArticlesPageSchema>({
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
});

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState,
    reducers: {
        //! редюсер изменения отображения. сохраняем в стейт новое отбражение и записываем его в локал
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
                action.payload,
            );
        },
        //! в этом редюсере получаем из локала вид отображения, сохраняем его в стейт и задаём лимит на колличество подгружаемых статей с бека.
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
            ) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 9;
            //! все, редюсер добавлен первый запрос сделан, эту страницу не размонтируем при выходе.
            state.inited = true;
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
                //! флаг о том что на сервере есть еще данные. если длинна массива пришедших статей больше текщего лимита отображения это значит что на сервере остались еще статьи, если длинна меньше значит это последние данные
                state.hasMore = action.payload.length >= state.limit;
                //! это при первом рендере запрашиваем первую страницу перед этим в состоянии запроса очищаем на всякий случай слайс.
                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                    //! а это значит добавляем новую порцию в конец
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
