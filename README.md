# БЛОГ (ещё в разработке) 

---
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
Обычные unit тесты на jest - npm run test:unit </br>
Тесты на компоненты с React testing library -npm run test:unit

---
### Линтинг
В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями. </br>
Также для строгого контроля главных архитектурных принципов используется собственный eslint plugin fsd-path (подключается локально через npm link eslint-plugin-fsd-path), который содержит пока 1 правило. </br>
path-checker - запрещает использовать абсолютные импорты в рамках одного модуля </br> 


---
### Запуск линтеров
npm run lint:ts - Проверка ts файлов линтером </br>
npm run lint:fix - Исправление ts файлов линтером и scss файлов style линтером </br>
npm run lint:scss - Проверка scss файлов style линтером

---
### Storybook
В проекте для каждого компонента описываются стори-кейсы. Запросы на сервер мокаются с помощью storybook-addon-mock. </br>
Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

---
### Конфигурация проекта
Для разработки проект содержит конфиг: </br>
Webpack - ./config/build </br>
Вся конфигурация хранится в /config </br>

/config/build - конфигурация webpack </br>
/config/jest - конфигурация тестовой среды </br>
/config/storybook - конфигурация сторибука </br>
В папке scripts находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд. 

---
### CI pipeline
Конфигурация github actions находится в /.github/workflows. </br>
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

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


