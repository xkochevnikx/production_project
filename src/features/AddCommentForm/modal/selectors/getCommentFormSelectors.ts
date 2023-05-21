import { IStateSchema } from 'app/providers/StoreProviders';

export const getCommentFormText = (state: IStateSchema) => state.addCommentForm?.text ?? '';
export const getCommentFormError = (state: IStateSchema) => state.addCommentForm?.error;

//! тут используем оператор нулевого слияния если левый операнд у нас null undefined то тогда подсталям пустую строку.
