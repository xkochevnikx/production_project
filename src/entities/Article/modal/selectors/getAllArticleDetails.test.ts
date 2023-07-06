import { IStateSchema } from '@/app/providers/StoreProviders';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from './getAllArticleDetails';

describe('getArticlesDetailsData.test', () => {
    test('data', () => {
        const dataTest = {
            id: '1',
            title: 'DataTest',
        };
        const state: DeepPartial<IStateSchema> = {
            articleDetails: {
                data: dataTest,
            },
        };
        expect(getArticleDetailsData(state as IStateSchema)).toEqual(dataTest);
    });

    test('data undefined', () => {
        const state: DeepPartial<IStateSchema> = {};
        expect(getArticleDetailsData(state as IStateSchema)).toEqual(undefined);
    });

    test('isLoading', () => {
        const state: DeepPartial<IStateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as IStateSchema)).toEqual(true);
    });

    test('isLoading false', () => {
        const state: DeepPartial<IStateSchema> = {
            articleDetails: {},
        };
        expect(getArticleDetailsIsLoading(state as IStateSchema)).toEqual(
            false,
        );
    });

    test('Error', () => {
        const state: DeepPartial<IStateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as IStateSchema)).toEqual('error');
    });

    test('error undefined', () => {
        const state: DeepPartial<IStateSchema> = {
            articleDetails: {},
        };
        expect(getArticleDetailsError(state as IStateSchema)).toEqual(
            undefined,
        );
    });
});
