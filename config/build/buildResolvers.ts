import { ResolveOptions } from 'webpack';
import { IBuildOptions } from './types/config';

export function buildResolvers(options: IBuildOptions): ResolveOptions {
    const typescriptResolvers = {
        //! это поле говорит что при импорте можно не указывать расширение
        extensions: ['.tsx', '.ts', '.js'],
        //! следующие два поля задают приоритет абсолютных путей из папки src
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        //! явно указываем что в каждом модуле это главный файл
        // mainFiles: ['index'],
        alias: {
            '@': options.paths.src,
        },
    };
    return typescriptResolvers;
}
