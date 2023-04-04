import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Code } from 'shared/UI/Code/Code';
import { IArticleCodeBlock } from '../../modal/types/article';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: IArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    ({ className, block }: ArticleCodeBlockComponentProps) => (
        <div className={classNames('', {}, [className])}>
            <Code text={block.code} />
        </div>
    )
);
