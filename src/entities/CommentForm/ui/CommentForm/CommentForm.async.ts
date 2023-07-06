import { FC, lazy } from 'react';
import { ICommentFormProps } from './CommentForm';

export const CommentFormAsync = lazy<FC<ICommentFormProps>>(
    () => import('./CommentForm'),
);
