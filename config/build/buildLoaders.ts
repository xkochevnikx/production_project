import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import { IBuildOptions } from "./types/config";

export function buildLoaders(options: IBuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2|TTF)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const babelLoader = {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
        plugins: [
          [
            "i18next-extract",
            { locales: ["ru", "en"], keyAsDefaultValue: true },
          ],
        ],
      },
    },
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // ? лоудеры важно добавлять в нужном порядке
      // ? если у нас сборка дев то пихаем стили в джс файл если продакш то делаем отдельных файл со стилями
      options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            //! это настройки для файлов css module тут в опциях при сборке функция автоматически определяет если в названии файла есть модуль то уже дальше мы пишем классы по заданной схеме если нет то она остаются классическими
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: options.isDev //! тут по шаблонам генерируем названия классов в файлах (в девсборке подробный путь) а в продакшн короткий
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [babelLoader, typescriptLoader, cssLoader, fileLoader, svgLoader];
}
