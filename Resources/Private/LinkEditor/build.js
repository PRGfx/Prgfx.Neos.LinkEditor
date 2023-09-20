const esbuild = require('esbuild');
const extensibilityMap = require("@neos-project/neos-ui-extensibility/extensibilityMap.json");
const isWatch = process.argv.includes('--watch');

/** @type {import("esbuild").BuildOptions} */
const options = {
    logLevel: "info",
    bundle: true,
    target: "es2020",
    entryPoints: { "Plugin": "src/index.js" },
    outdir: "../../Public/Plugin/LinkEditor",
    alias: extensibilityMap
}

if (isWatch) {
    esbuild.context(options).then((ctx) => ctx.watch())
} else {
    options.minify = true;
    esbuild.build(options)
}
