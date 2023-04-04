import webpack from 'webpack';
import { buildBabelLoaders } from './loaders/buildBabelLoaders';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { IBuildOptions } from './types/config';

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

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = buildBabelLoaders(options);

    const cssLoader = buildCssLoaders(isDev);

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [babelLoader, typescriptLoader, cssLoader, fileLoader, svgLoader];
}
