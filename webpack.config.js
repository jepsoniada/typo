const HTMLwpPlug = require("html-webpack-plugin")

module.exports = {
    entry: {
        funcBar: { import: "./functionBar.js", filename: "functionBar.js" },
        optionsJs: { import: "./src/options.js", filename: "options.js" },
    },
    mode: "development",
    devtool: false,
    // output: {
    //     // path: './dist/',
    //     filename: "functionBar.js",
    // },
    plugins: [
        new HTMLwpPlug({
            template: './src/typoOptions.pug',
            filename: "typoOptions.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    'pug-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        sourceMap: false,
                        babelrc: false,
                        presets: [["@babel/preset-env", {targets: {chrome: "89",}}]],
                    }
                }
            }
        ]
    }
}