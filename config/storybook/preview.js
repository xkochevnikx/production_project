import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { Theme } from '@/shared/consts/theme';
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: 'orange',
        list: [
          { name: 'orange', class: Theme.ORANGE },
          { name: 'light', class: Theme.LIGHT}, 
          { name: 'dark', class: Theme.DARK }

        ],
      },
};

//! добавляем "дефолтные глобальные" декораторы обёртки. если например надо изменить тему то в сторисе её переопределяем
addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
