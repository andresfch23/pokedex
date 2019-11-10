// Webpack uses this to work with directories
const path = require('path');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// This is main configuration object
// Here you write different options and tell webpack what to do
module.exports = {

    // Path to your entry point. From this file Webpack will begin his work 
    entry: './src/javascript/index.js',

    // Path and filename of your result bundle
    // Webpack will bundle all Javascript into this file

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    /* {
                        loader: MiniCssExtractPlugin.loader
                    }, */
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ],
    },

    /* plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]         */
}