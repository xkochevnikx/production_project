# БЛОГ (ещё в разработке) 
Собственно это то чем я занимаюсь с февраля, в своем роде что то типо Харба, сайт со статьями и возможностью их обсуждения после регистрации.
Имеет интернационализацию на двух языках, несколько легко внедряемых тем и кучу других классных штук. 
При разработки стараюсь придерживаться [FSD](https://feature-sliced.design/ru/) - архитектурной методологии. 

### Технологии
- TypeScript 
- React
- React Router DOM
- Json-server
- Axios
- Webpack 
- SCSS
- Storybook 
- Jest test
- CI (Continuous Integration)
- i18n 
- Redux toolkit
- Prettier/Eslint/StyleLint

### Интерфейс
Веб-приложение, c оптимизацией для мобильных устройств

### Архитектура проекта
Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - feature sliced design

### Работа с переводами
В проекте используется библиотека i18next для работы с переводами. Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - https://react.i18next.com/

### Тесты
В проекте используются 2 вида тестов:

Обычные unit тесты на jest - npm run test:unit
Тесты на компоненты с React testing library -npm run test:unit

### Линтинг
В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов используется собственный eslint plugin fsd-path (подключается локально через npm link eslint-plugin-fsd-path), который содержит пока 1 правило

path-checker - запрещает использовать абсолютные импорты в рамках одного модуля 

позже будут еще добавлены два
layer-imports - проверяет корректность использования слоев с точки зрения FSD (например widgets нельзя использовать в features и entitites)
public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

### Запуск линтеров
npm run lint:ts - Проверка ts файлов линтером
npm run lint:fix - Исправление ts файлов линтером и scss файлов style линтером
npm run lint:scss - Проверка scss файлов style линтером

### Storybook
В проекте для каждого компонента описываются стори-кейсы. Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx


### Конфигурация проекта
Для разработки проект содержит конфиг:

Webpack - ./config/build

Вся конфигурация хранится в /config

/config/build - конфигурация webpack
/config/jest - конфигурация тестовой среды
/config/storybook - конфигурация сторибука
В папке scripts находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

### CI pipeline
Конфигурация github actions находится в /.github/workflows. В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.


### Работа с данными
Взаимодействие с данными осуществляется с помощью redux toolkit. По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter
Запросы на сервер отправляются с помощью axios
Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется useDynamicReducerLoader


### Демонстрация интерфейса

<a href="https://ibb.co/j6tyTvr"><img src="https://i.ibb.co/dWZPr05/prod-Proj1.png" alt="prod-Proj1" border="0"></a>

<a href="https://ibb.co/sRh4td4"><img src="https://i.ibb.co/C8qyW3y/prod-Proj3.png" alt="prod-Proj3" border="0"></a>

<a href="https://ibb.co/vL5Nfs6"><img src="https://i.ibb.co/5sDQCYg/prod-Proj2.png" alt="prod-Proj2" border="0"></a>

### Установка
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org) v8+.

### Установка зависимостей
Для установки зависимостей, выполните команду:
```sh
$ npm i
```

### Запуск Development сервера 
Чтобы запустить сервер для разработки, выполните команду:
```sh
npm run start:dev
```

### Webpack cборка в двух режимах 
```sh
npm run build:dev - режим разработки / npm run build:prod - прод режим 
```

## Команда проекта

- [Святослав Деев](https://github.com/xkochevnikx) — Front-End Engineer


