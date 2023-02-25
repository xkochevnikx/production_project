import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoaders(isDev: boolean) {
   return {
      test: /\.s[ac]ss$/i,
      use: [
         // ? лоудеры важно добавлять в нужном порядке
         // ? если у нас сборка дев то пихаем стили в джс файл если продакш то делаем отдельных файл со стилями
         isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
         {
            loader: 'css-loader',
            options: {
               modules: {
                  //! это настройки для файлов css module тут в опциях при сборке функция автоматически определяет если в названии файла есть модуль то уже дальше мы пишем классы по заданной схеме если нет то она остаются классическими
                  auto: (resPath: string) =>
                     Boolean(resPath.includes('.module.')),
                  localIdentName: isDev //! тут по шаблонам генерируем названия классов в файлах (в девсборке подробный путь) а в продакшн короткий
                     ? '[path][name]__[local]--[hash:base64:5]'
                     : '[hash:base64:8]',
               },
            },
         },
         'sass-loader',
      ],
   };
}
