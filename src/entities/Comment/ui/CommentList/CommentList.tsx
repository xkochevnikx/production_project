import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { IComment } from 'entities/Comment/modal/types/comment';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/UI/Text/ui/Text';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    comments?: IComment[];
    isLoading?: boolean;
}

export const CommentList = memo(
    ({ className, comments, isLoading }: CommentListProps) => {
        const { t } = useTranslation('articles');

        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            comment={comment}
                            className={cls.comment}
                        />
                    ))
                ) : (
                    <Text text={t('Комментарии отсутствуют')} />
                )}
            </div>
        );
    },
);
