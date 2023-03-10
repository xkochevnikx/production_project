import { rules } from '@typescript-eslint/eslint-plugin';
import path from 'path';
import { DefinePlugin, RuleSetRule } from 'webpack';
import { WebpackConfiguration } from 'webpack-dev-server';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { IBuildPath } from '../build/types/config';

export default ({ config }: { config: WebpackConfiguration }) => {
    const paths: IBuildPath = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('ts', 'tsx');

    // eslint-disable-next-line no-param-reassign
    config.module!.rules! = config!.module!.rules!.map((rule: any) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    config.module?.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoaders(true));

    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: true,
        }),
    );

    return config;
};
