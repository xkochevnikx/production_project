### Блог статей представляет собой приложение со следующим функционалом и фичами:

-   Авторизация пользователя через форму в модальном окне.
-   Авторизованному пользователю доступен скрытый роутинг к страницам с полным функционалом, переход на которые физически не возможен пользователю без авторизации.
-   Интернационализация с возможностью вынесения в чанки больших переводов.
-   Три цветовые темы с возможностью легкого внедрения новых.
-   Выпадающие dropdown и popover с использованием headless ui.
-   Условный рендеринг компонентов в зависимости от устройства пользователя на основе react-device-detect.
-   Использование асинхронно догружаемых библиотек для анимации react spring/use gesture.
-   Профиль пользователя можно редактировать и отменять это редактирование в процессе.
-   Список статей доступе в 2 вариантах просмотра.
-   Список статей имеет динамиический поиск и фильтрацию по категориям параметры которого сохраняются в адресной строке (благодаря URLSearchParams) и доступны при каждой перезагрузке страницы.
-   Список статей имеет бесконечный скролл на основе кастомного хука используеющего под капотом IntersectionObserver.
-   Список статей сохраняет скролл с использованием кастомного хука испольхующего механизм троллинга под капотом.
-   При подгрузке статей показываю пользователю скелетоны.
-   Каждая статья динамически формируется из переиспользумых блоков в зависимости от типа раздела.
-   Под каждой статьей пользователь может оставлять комментарии. <br/>
    ......... и многое другое, описание в процессе

### Технологии

-   TypeScript
-   React
-   React Router DOM
-   Json-server
-   Axios
-   Webpack
-   Vite
-   SCSS
-   Storybook
-   Jest test
-   CI (Continuous Integration)
-   i18n
-   Redux toolkit
-   RTK Query
-   Husky
-   Prettier/Eslint/StyleLint

---

### Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design </br>
[Ссылка на документацию](https://feature-sliced.design/ru/)

---

### Работа с переводами

В проекте используется библиотека i18next для работы с переводами. Файлы с переводами хранятся в public/locales. </br>
Для комфортной работы рекомендуем установить плагин для webstorm/vscode </br>
[Документация i18next](https://react.i18next.com)

---

### Тесты

В проекте используются 2 вида тестов: </br>
Обычные unit тесты на jest и на компоненты с React testing library - npm run test:unit </br>
С помощью пакета jest-html-reporters после прогона формируется отчет.

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов написал 3 собственных кастомных плагина:

1. eslint-plugin-api-imports-svt, разрешает импорт из других модулей только из public api.
   Так же дополнительно правило проводит проверку получателя импотрируемых данных предназначенных для тестирования, эти данные должны импортироваться экспортироваться из тестового public api только в файлы с тестовыми расширениями stories.tsx/test.ts/storeDecorator.tsx
2. eslint-plugin-fsd-path-svt - запрещает использовать абсолютные импорты в рамках одного модуля, они должны быть относительными.
3. eslint-plugin-interface-prefix-control-svt - разрешает использовать префиксы Interfaces in TypeScript начинающиеся только с "I".

##### Запуск линтеров

-   `npm run lint:ts` - Проверка ts файлов линтером
-   `npm run lint:ts:fix` - Исправление ts файлов линтером
-   `npm run lint:scss` - Проверка scss файлов style линтером
-   `npm run lint:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

-   `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

-   /config/babel - babel
-   /config/build - конфигурация webpack
-   /config/jest - конфигурация тестовой среды
-   /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяю проект линтерами только тех файлов которые были изменены с помощью [lint-staged](https://github.com/okonet/lint-staged), конфиг в /.husky

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit. По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter </br>
Запросы на сервер отправляются с помощью axios </br>
Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется useDynamicReducerLoader

---

### Демонстрация интерфейса

<a href="https://ibb.co/j6tyTvr"><img src="https://i.ibb.co/dWZPr05/prod-Proj1.png" alt="prod-Proj1" border="0"></a>

<a href="https://ibb.co/sRh4td4"><img src="https://i.ibb.co/C8qyW3y/prod-Proj3.png" alt="prod-Proj3" border="0"></a>

<a href="https://ibb.co/vL5Nfs6"><img src="https://i.ibb.co/5sDQCYg/prod-Proj2.png" alt="prod-Proj2" border="0"></a>

## Запуск проекта

Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org) v8+.

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

-   `npm run start:vite` - Запуск frontend проекта на vite
-   `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
-   `npm run start:dev:vite` - Запуск frontend проекта на vite + backend
-   `npm run start:dev:server` - Запуск backend сервера
-   `npm run build:prod` - Сборка в prod режиме
-   `npm run build:dev` - Сборка в dev режиме (не минимизирован)
-   `npm run lint:ts` - Проверка ts файлов линтером
-   `npm run lint:ts:fix` - Исправление ts файлов линтером
-   `npm run lint:scss` - Проверка scss файлов style линтером
-   `npm run lint:fix` - Исправление scss файлов style линтером
-   `npm run test:unit` - Хапуск unit тестов с jest
-   `npm run test:ui` - Хапуск скриншотных тестов с loki
-   `npm run storybook` - запуск Storybook
-   `npm run storybook:build` - Сборка storybook билда
-   `npm run prepare` - прекоммит хуки

## Сущности (entities)

-   [Article](/src/entities/Article)
-   [Comment](/src/entities/Comment)
-   [CommentForm](/src/entities/CommentForm)
-   [Counter](/src/entities/Counter)
-   [Country](/src/entities/Country)
-   [Currency](/src/entities/Currency)
-   [Notification](/src/entities/Notification)
-   [ProfileCard](/src/entities/ProfileCard)
-   [Rating](/src/entities/Rating)
-   [User](/src/entities/User)

## Фичи (features)

-   [ArticleComments](/src/features/ArticleComments)
-   [ArticleRating](/src/features/ArticleRating)
-   [ArticlesInfiniteList](/src/features/ArticlesInfiniteList)
-   [ArticlesSearch](/src/features/ArticlesSearch)
-   [ArticlesSortSelected](/src/features/ArticlesSortSelected)
-   [ScrollSave](/src/features/ScrollSave)
-   [ArticlesTypeTabs](/src/features/ArticlesTypeTabs)
-   [ArticleViewSelector](/src/features/ArticleViewSelector)
-   [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
-   [AuthByUsername](/src/features/AuthByUsername)
-   [AvatarDropdown](/src/features/AvatarDropdown)
-   [EditableProfileCard](/src/features/EditableProfileCard)
-   [LanguageSwitcher](/src/features/LanguageSwitcher)
-   [NotificationButton](/src/features/NotificationButton)
-   [ProfileRating](/src/features/ProfileRating)
-   [ThemeSwitcher](/src/features/ThemeSwitcher)
-

## UI Kit

-   [Shared](/src/shared/UI)

## Команда проекта

-   [Святослав Деев](https://github.com/xkochevnikx) — Front-End Engineer
