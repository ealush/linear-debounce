'use strict';

const webpack = require('webpack'),
    path = require('path');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    env = process.env.WEBPACK_ENV,
    libraryName = 'linear',
    plugins = [];

let outputFile,
    outputDir;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
    outputFile = `${libraryName}.min.js`;
    outputDir = 'dist';
} else {
    outputFile = `${libraryName}.js`;
    outputDir = 'dist';
}

const config = {
    entry: `${__dirname}/src/index.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}/${outputDir}`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /(node_modules)/
        }]
    },
    resolve: {
        alias: {
            root: path.resolve('./src')
        }
    },
    plugins
};

module.exports = config;