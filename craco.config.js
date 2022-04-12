const CracoSwcPlugin = require('craco-swc');

const jsc = {
    externalHelpers: true,
    target: 'es5',
    parser: {
        syntax: 'typescript',
        tsx: true,
        dynamicImport: true,
        // exportDefaultFrom: true,
    },
    transform: {
        react: {
            runtime: 'automatic',
        },
    },
};

CracoSwcPlugin.overrideJestConfig = ({ jestConfig }) => {
    const babelKey = Object.keys(jestConfig.transform)[0];

    jestConfig.transform[babelKey] = [require.resolve('@swc/jest'), { jsc }];

    return jestConfig;
};

module.exports = {
    plugins: [
        {
            plugin: CracoSwcPlugin,
            options: {
                swcLoaderOptions: {
                    jsc,
                },
            },
        },
    ],
};
