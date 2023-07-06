import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/config';

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        //! автоматически открывает приложение
        open: true,
        //! historyApiFallback позволяет проксировать запросы через индекс (через корневую страницу)
        historyApiFallback: true,
        hot: true,
    };
}
