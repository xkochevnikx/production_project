import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlagin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { IBuildOptions } from './types/config';

export function buildPlagins({
    paths,
    isDev,
    apiUrl,
    project,
}: IBuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        //! первый подключаемый плагин создаёт в build - html файл для входа и автоматически подставляет скрипт. в template путь к файлу используемому как шаблон
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        //! показывает проценты в процессе сборки
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlagin({
            //! указываем названия файлов и ниже названия асинхронных чанков компонентов которые обёрнуты в лази или добавляются динамически
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        //! плагин для прокидывания глобальных переменных в приложение что бы они были везде доступны. в качестве значений выступют либо переменные окружения env либо то что идёт вместо них по умолчанию. по умолчпнию тс ничего не знает про тип этой переменной поэтому в глабальных стилях надо этот тп объявить
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            //! эта переменная нужна для того что бы в глобальной области задавать характер сборки. В Конфиге сторибука эта переменная задана как сторибук, и это позволяет задавать условия что бы при рендеринге компонента он например юзеффект не отправлял запрос на сервер для получения данных потому что задаём мы данные сами фейковые.
            __PROJECT__: JSON.stringify(project),
        }),
        //! плагин для копирования чего то в сборку. в данном случае переводов
        new CopyPlugin({
            patterns: [{ from: paths.locales, to: paths.buildLocales }],
        }),
    ];

    //! эти два плагина добавляем только в режиме сборки
    if (isDev) {
        //! плагин для мгновенной перерисовки после изменений
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        );
    }

    return plugins;
}
