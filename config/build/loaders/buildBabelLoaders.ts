import { IBuildOptions } from '../types/config';

export function buildBabelLoaders(options: IBuildOptions) {
    const { isDev } = options;
    //! preset-env преобразовывает новые стандарты языка в старые
    return {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };
}
