import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Input } from 'shared/UI/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/Button';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/UI/Stack/HStack/HStack';

import {
    CommentFormActions,
    CommentFormReducer,
} from 'entities/CommentForm/modal/slice/CommentFormSlice';
import { getCommentFormText } from '../../modal/selectors/getCommentFormSelectors';
import cls from './CommentForm.module.scss';

export interface ICommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    commentForm: CommentFormReducer,
};

const CommentForm = memo(({ className, onSendComment }: ICommentFormProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const text = useSelector(getCommentFormText);

    //! это функция на инпуте принимает строку и добавляет ей в слайс комментов который не привязан к бизнес логике(сущностям) и выше мы сразу достаём эту строку из слайса и подставляем в функцию которая передаст её выше в вызванную onSendComment спущенную пропсом. и дальше очищаем стей путсыми кавычками
    const onCommentChangeText = useCallback(
        (value: string) => {
            dispatch(CommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentChangeText('');
    }, [text, onSendComment, onCommentChangeText]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                max
                justify="between"
                className={classNames(cls.CommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст')}
                    value={text}
                    onChange={onCommentChangeText}
                />
                <Button onClick={onSendHandler}>{t('Отправить')}</Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

export default CommentForm;
