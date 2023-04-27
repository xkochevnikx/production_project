import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Input } from 'shared/UI/Input/UI/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/ui/Button';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../modal/slice/addCommentFormSlice';
import { getCommentFormText } from '../../modal/selectors/getCommentFormSelectors';
import cls from './AddCommentForm.module.scss';

export interface IAddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
    ({ className, onSendComment }: IAddCommentFormProps) => {
        const { t } = useTranslation();

        const dispatch = useAppDispatch();

        const text = useSelector(getCommentFormText);

        const onCommentChangeText = useCallback(
            (value: string) => {
                dispatch(addCommentFormActions.setText(value));
            },
            [dispatch],
        );

        const onSendHandler = useCallback(() => {
            onSendComment(text || '');
            onCommentChangeText('');
        }, [text, onSendComment, onCommentChangeText]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <div
                    className={classNames(cls.AddCommentForm, {}, [className])}
                >
                    <Input
                        placeholder={t('Введите текст')}
                        value={text}
                        onChange={onCommentChangeText}
                    />
                    <Button onClick={onSendHandler}>{t('Отправить')}</Button>
                </div>
            </DynamicModuleLoader>
        );
    },
);

export default AddCommentForm;
