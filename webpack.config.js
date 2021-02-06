module.exports = {
    entry: "./functionBar.js",
    mode: "development",
    output: {
        // path: './dist/',
        filename: "functionBar.js",
    },
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
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}