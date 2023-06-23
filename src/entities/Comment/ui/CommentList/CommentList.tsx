import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/UI/Text/Text';
import { VStack } from 'shared/UI/Stack/VStack/VStack';
import { IComment } from '../../modal/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    comments?: IComment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ comments, isLoading }: CommentListProps) => {
    const { t } = useTranslation('articles');

    if (isLoading) {
        return (
            <VStack max gap='16'>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap='8' max>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </VStack>
    );
});
