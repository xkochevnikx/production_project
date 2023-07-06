import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/UI/Text/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { IArticleTextBlock } from '../../modal/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block?: IArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    ({ className, block }: ArticleTextBlockComponentProps) => (
        <div
            className={classNames(cls.ArticleTextBlockComponent, {}, [
                className,
            ])}
        >
            {block?.title && <Text title={block.title} className={cls.title} />}
            {block?.paragraphs.map((p) => (
                <Text key={p} text={p} className={cls.paragraph} />
            ))}
        </div>
    ),
);
