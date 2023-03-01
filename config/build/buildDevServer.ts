import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/config';

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
    //! historyApiFallback позволяет проксировать запросы через индекс (через корневую страницу)
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
