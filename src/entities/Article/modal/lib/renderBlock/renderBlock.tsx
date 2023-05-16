import { ArticleImageBlockComponent } from '../../../ui/ArticleImageBlockComponents/ArticleImageBlockComponent';
import { ArticleBlock, ArticleBlockType } from '../../types/article';
import { ArticleCodeBlockComponent } from '../../../ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from '../../../ui/ArticleDetails/ArticleDetails.module.scss';

//! функция для отрисовки блоков, она принимает блок смотрит тип и на этом основании возвращает компонент
export const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
        return (
            <ArticleCodeBlockComponent
                key={block.id}
                block={block}
                className={cls.block}
            />
        );
    case ArticleBlockType.IMAGE:
        return (
            <ArticleImageBlockComponent
                key={block.id}
                block={block}
                className={cls.block}
            />
        );
    case ArticleBlockType.TEXT:
        return (
            <ArticleTextBlockComponent
                key={block.id}
                block={block}
                className={cls.block}
            />
        );
    default:
        return null;
    }
};
