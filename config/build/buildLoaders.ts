import webpack from 'webpack';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { IBuildOptions } from './types/config';

export function buildLoaders({ isDev }: IBuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpe?g|gif|ttf)$/i,

        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // const ttfLoader = {
    //     options: {
    //         name: `fonts/[name].[ext]`,
    //         publicPath: '../',
    //     },
    // };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [['i18next-extract', { locales: ['ru', 'en'], keyAsDefaultValue: true }]],
            },
        },
    };

    const cssLoader = buildCssLoaders(isDev);

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [babelLoader, typescriptLoader, cssLoader, fileLoader, svgLoader];
}
