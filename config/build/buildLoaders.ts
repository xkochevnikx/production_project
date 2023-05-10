import webpack from 'webpack';
import { buildBabelLoaders } from './loaders/buildBabelLoaders';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { IBuildOptions } from './types/config';
import { buildSvgLoader } from './loaders/buildSvgLoader';

//! лоадеры обрабатывают файлы и компилируют их в js. Важен их порядок в возвращаемом массиве. сначала тс компилируем в джс потом байблом компилируем с старыей стандарт языка. бейбл надо при сборке ставить 100%
export function buildLoaders(options: IBuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    const fileLoader = {
        test: /\.(png|jpe?g|gif|ttf)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const svgLoader = buildSvgLoader();

    //! изначально был добавлен для обработки переводов и запиливания их в отдельную папку но мне это не нужно
    const babelLoader = buildBabelLoaders(options);

    const cssLoader = buildCssLoaders(isDev);

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        //! исключаем папку
        exclude: /node_modules/,
    };

    //!

    return [babelLoader, typescriptLoader, cssLoader, fileLoader, svgLoader];
}
