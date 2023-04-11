import { IStateSchema } from 'app/providers/StoreProviders';

export const getCommentFormText = (state: IStateSchema) => state.addCommentForm?.text;
export const getCommentFormError = (state: IStateSchema) => state.addCommentForm?.error;
