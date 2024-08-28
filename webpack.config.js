const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = (env) => {
    const config = {
        mode: env.mode ?? 'development',
        devtool: 'inline-source-map',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    exclude: /\.module\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@shared': path.resolve(__dirname, './src/shared'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@src': path.resolve(__dirname, './src'),
                '@packageSrc': path.resolve(__dirname, './package.json'),
            },
        },
    }
    return config
}