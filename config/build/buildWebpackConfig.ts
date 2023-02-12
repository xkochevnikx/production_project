import webpack from 'webpack';
import { IBuildOptions } from './types/config';
import { buildPlagins } from './buildPlagins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(
    options: IBuildOptions,
): webpack.Configuration {
    const {
        mode, paths, port, isDev,
    } = options;

    return {
        mode,

        // Указываем входную точку
        entry: paths.entry,

        // Указываем точку выхода, сюда всё будет собираться
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            assetModuleFilename: 'assets/[contanthash][ext]',
        },

        plugins: buildPlagins(options),

        // Указываем тут, что будем использовать спец. модуль для определенных файлов (лоадер)
        module: {
            // Указываем правила для данных модулей
            rules: buildLoaders(options),
        },

        // указываем расширение тех файлов при импорте которых не обязательно в конце указывать расширение
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
