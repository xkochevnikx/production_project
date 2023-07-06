import webpack from 'webpack';
import { IBuildOptions } from './types/config';
import { buildPlagins } from './buildPlagins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(
    options: IBuildOptions,
): webpack.Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,

        //! Указываем входную точку
        entry: paths.entry,

        //! Указываем точку выхода, сюда всё будет собираться
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            assetModuleFilename: 'assets/[contanthash][ext]',
            publicPath: '/',
        },

        plugins: buildPlagins(options),

        //! Указываем тут, что будем использовать спец. модуль для определенных файлов (лоадер)
        module: {
            //! Указываем правила для данных модулей
            rules: buildLoaders(options),
        },

        //! указываем расширение тех файлов при импорте которых не обязательно в конце указывать расширение
        resolve: buildResolvers(options),
        //! для режима разработки карты исходного кода что бы отслеживать по стек трейсу где произошла ошибка. В режими прода они не нужны это лишние файлы
        devtool: isDev ? 'inline-source-map' : undefined,
        //!
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
