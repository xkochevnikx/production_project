import babelRemovePropsPlugin from '../babelRemovePropsPlugin/babelRemovePropsPlugin';
import { IBuildOptions } from '../types/config';

interface IBabelLoaderProps extends IBuildOptions {
    isTsx?: boolean;
}
export function buildBabelLoaders({ isDev, isTsx }: IBabelLoaderProps) {
    //! preset-env преобразовывает новые стандарты языка в старые
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',

                    ...(isTsx && !isDev
                        ? [
                            [
                                babelRemovePropsPlugin,
                                {
                                    props: ['data-testid'],
                                },
                            ],
                        ]
                        : []),
                ],
            },
        },
    };
}
