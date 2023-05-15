// Импортируем модуль для работ с путями
import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { IBuildEnv, IBuildPath } from './config/build/types/config';

//! аргументом принимаем переменные  откружения для которых тоже заранее прописываем типы. При выполнении скрипта запуска или сборки передаём переменную env. При сборки в первую очередь пытаемся получить переменные но если они не заданы берём дефолтное значение
export default (env: IBuildEnv) => {
    const paths: IBuildPath = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    };

    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const PORT = env.port || 3000;
    const apiUrl = env.apiUrl || 'http://localhost:8000';

    //! конфигурационный файл
    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        //! у нас есть три среды и для каждой в конфиге мы задаём глобальный флаг переменную что бы исходя из характера сборки как то задать функционал. например при сторибучной сборки нам не надо делать запросы на сервер поэтому по условию при рендеринге компонета идёт проверка и если сборка сторибук выполенние запроса не происходит
        project: 'frontend',
    });

    return config;
};
