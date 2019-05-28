const { compilerOptions } = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
    baseUrl: compilerOptions.outDir,
    paths: compilerOptions.paths,
});
