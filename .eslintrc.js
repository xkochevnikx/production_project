module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'fsd-path-svt',
        'api-imports-svt',
        'interface-prefix-control-svt',
        'react',
        '@typescript-eslint',
        'react-hooks',
        "unused-imports",
    ],
    rules: {
        'react/jsx-indent': [2, 4], //! правило отступов. 2 - правило работает. 4 - кол-во отсупов
        'react/jsx-indent-props': [2, 4], //! отступы для кода с пропсами
        indent: [2, 4], //! отступы для всех файлов кроме jsx
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ], //! странное свойство которое разрешает использование jsx в файлах с разным расширением
        'import/no-unresolved': 'off', //! отключаем правило которое ругалось на абсолютные пути
        'import/prefer-default-export': 'off', //! отключаем правило которое советует использовать дефолтный экспорт хотя лучше использовать именованный
        'no-unused-vars': 'warn', //! ругаемся на наличие неиспользуемых переменных
        'react/require-default-props': 'off', //! отключаем свойство которое требует везде в необязательных пропсах ставить дефолтное значение
        'react/react-in-jsx-scope': 'off', //! отключаем свойство которое требует импортировать в jsx - react хотя с 17 версии это делать не обязательно
        'react/jsx-props-no-spreading': 'warn', //! что бы можно использовать спред оператор в пропсах НО ТОЛЬКО В UI компонентах
        'react/function-component-definition': 'off', //! отключаем правило которое ругается на использование фанкшн экспрешн, сам эслинт хочет видеть факнш декларейшн
        'no-shadow': 'off', //! отключаем свойство которое хочет видеть enum в области компонета
        'import/extensions': 'off', //! отключаем свойство которое ругается что в импортах не указываю расширения но для этого у меня уже настроен билдрезолвер
        'import/no-extraneous-dependencies': 'off', //! это что то связано с импортом девзависмостей
        'no-underscore-dangle': 'off', //! оключаем запрет на нижние подчёркивания
        'max-len': ['error', { ignoreComments: true, code: 150 }], //! ошибку если строчка длинная
        'jsx-a11y/no-static-element-interactions': 'off', //! отключаем правило сематники когда например еслинт ругается на онклик у блока див
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error', //! это и правило ниже устанавливается от плагина react-hooks которое так же наверху нужно добавить в раздел plugins.
        'react-hooks/exhaustive-deps': 'error', //! что бы не забывать указывать зависимости
        'no-param-reassign': 'off', //! внутри редакса есть библиотека позволяющая менять аргументы функции напрямую. а это правило такое запрещает поэтому конфликт отключаем
        // 'react/jsx-no-bind': ['warn', { ignoreDOMComponents: true }],
        'linebreak-style': ['error', 'windows'],
        'no-undef': 'off',
        'react/no-array-index-key': 'off', //! отключаем правило запрещающее использование индекса в качестве ключа. Если у нас массив не изменяемый то индекс использовать можно
        'react/jsx-no-useless-fragment': 'off',
        'no-console': 'warn', //ругаюсь на использование консоли в коде
        'prefer-const': 'error', //ругаюсь на использование let переменных
        'fsd-path-svt/path-checker': ['error', { alias: '@' }],
        'interface-prefix-control-svt/prefix-control': 'warn',
        'api-imports-svt/api-imports': [
            'error',
            {
                alias: '@',
                testFiles: [
                    '**/*.test.ts',
                    '**/StoreDecorator.tsx',
                    '**/*stories.tsx',
                ],
            },
        ],
        'api-imports-svt/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProviders', '**/testing'],
            },
        ],
        "unused-imports/no-unused-imports": "error",


        // 'arrow-body-style': 'off',
    },
    globals: {
        //! что бы не ругался на глобальные переменные
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    //! позволяет для каких то файлов переопределить правила
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off', //! в тестовых файлах отключаем переводы
                'max-len': 'off', //! и длинну отключаем
            },
        },
    ],
};
