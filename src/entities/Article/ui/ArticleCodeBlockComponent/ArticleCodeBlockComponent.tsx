import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Code } from 'shared/UI/Code/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { IArticleCodeBlock } from '../../modal/types/article';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: IArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    ({ className, block }: ArticleCodeBlockComponentProps) => (
        <div
            className={classNames(cls.ArticleCodeBlockComponent, {}, [
                className,
            ])}
        >
            <Code text={block.code} />
        </div>
    ),
);
