import path from 'path';

//! путь до этого конфига задаётся в скрипте запуска
//! в конфиге бейбла есть пресет тайпскрипт для тестов
export default {
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: '',
    },
    clearMocks: true, //! очищаем моки после теста
    testEnvironment: 'jsdom', //! тестовая среда
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    moduleDirectories: ['node_modules', 'src'],
    rootDir: '../../', //! путь до корневой папки
    testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'], //! находим файлы
    setupFilesAfterEnv: ['<rootDir>config/jest/jest-setup.ts'], //! путь до файла с jest-dom он нужен для виртуального рендеринга компонента
    moduleNameMapper: {
        //! первый пакет устанавливается для того что бы jest понимал css
        '\\.s?css$': 'identity-obj-proxy',
        //! это мапер для компонентов с расширение свг
        '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
        '^axios$': require.resolve('axios'),
    },
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: '<rootDir>/reports/unit',
                filename: 'report.html',
                openReport: true,
                inlineSource: true,
            },
        ],
    ],
};
