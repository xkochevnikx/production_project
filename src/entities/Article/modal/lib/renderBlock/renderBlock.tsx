import { ArticleImageBlockComponent } from '../../../ui/ArticleImageBlockComponents/ArticleImageBlockComponent';
import { ArticleBlock } from '../../types/article';
import { ArticleCodeBlockComponent } from '../../../ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType } from '../../consts/consts';

//! функция для отрисовки блоков, она принимает блок смотрит тип и на этом основании возвращает компонент
export const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} block={block} />;
    case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} block={block} />;
    case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} block={block} />;
    default:
        return null;
    }
};
