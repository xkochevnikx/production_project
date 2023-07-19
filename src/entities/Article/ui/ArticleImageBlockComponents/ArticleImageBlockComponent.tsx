import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/UI/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { IArticleImageBlock } from '../../modal/types/article';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: IArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    ({ className, block }: ArticleImageBlockComponentProps) => (
        <div
            className={classNames(cls.ArticleImageBlockComponent, {}, [
                className,
            ])}
        >
            <img src={block.src} className={cls.img} alt={block.title} />
            {block.title && <Text text={block.title} />}
        </div>
    ),
);
