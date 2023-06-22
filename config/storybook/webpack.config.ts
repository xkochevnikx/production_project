import path from 'path';
import { DefinePlugin } from 'webpack';
import { WebpackConfiguration } from 'webpack-dev-server';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { IBuildPath } from '../build/types/config';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

//! это конфиг переопределяет специально для сторибука некоторые параметры. то есть фугкция принимает мой вебпак конфиг и возвращает его изменённый никак не затрагивая основной.

export default ({ config }: { config: WebpackConfiguration }) => {
    const paths: IBuildPath = {
        build: '',
        html: '',
        entry: '',
        //! указываю путь до папки с исходным кодом. это для абсолютных импортов, то есть просто переопределяю путь
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };

    //! а тут уже этот путь пушу в массив
    config!.resolve!.modules!.push(paths.src);
    //! это поле говорит что при импорте можно не указывать расширение
    config!.resolve!.extensions!.push('ts', 'tsx');
    //! дисайблить и костовать в конфиге допустимо.
    //! есть массив дефолтных лоудеров, проходимся по нему мапом и если в одном из них есть в обработке свг мы возвращаем обратно в этот дефолтный массив элементы не содержащие обработку этих файлов. И дальше ниже пушим в него новый лоудер
    // eslint-disable-next-line no-param-reassign
    config!.module!.rules = config.module!.rules!.map((rule: any) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    //! этот и следущий обработчик исполльзуются как в основном конгифе так и тут поэтому они сделаны переиспользуемыми функциями
    config!.module!.rules.push(buildSvgLoader());

    //! определяем плагин для обработки css файлов потому что по умолчанию сторибук ничего про их обработку не знает
    config!.module!.rules.push(buildCssLoaders(true));

    //! плагин для прокидывания глобальных переменных в приложение что бы они были везде доступны.
    config!.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: true,
            //! тут порт указывать не надо мы его получаем при сборке
            __API__: JSON.stringify('https://qwerty.ru'), // апи для мокания возвращаемых "сервером данных" например для компонента articleRecommendationsList
            //! эта переменная нужна для того что бы в глобальной области задавать характер сборки. В Конфиге вебпака эта переменная задана как фронетнд, и это позволяет задавать условия что бы при рендеринге компонента он например юзеффект отправлял запрос на сервер для получения данных НО В СТОРИБУКЕ это делать не нужно
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );

    return config;
};
