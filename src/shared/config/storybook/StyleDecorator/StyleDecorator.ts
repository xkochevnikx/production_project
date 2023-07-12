import { Story } from '@storybook/react';
// eslint-disable-next-line
import '../../../../app/styles/index.scss';

//! по умолчанию сторибук ничего не знает про глобавлные стили и для этого делаем обёртку в которую стили импортируем для того что бы каждый раз в каждый файл эти стили не тащить
export const StyleDecorator = (story: () => Story) => story();
