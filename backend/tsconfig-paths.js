const tsConfigPaths = require('tsconfig-paths');

const { compilerOptions } = require('./tsconfig.json');

tsConfigPaths.register({
    baseUrl: compilerOptions.outDir,
    paths: compilerOptions.paths,
});
