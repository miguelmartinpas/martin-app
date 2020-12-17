const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    const isProd = env.production;

    return {
        context: __dirname,
        entry: './src/index.tsx',
        devtool: isProd ? false : 'inline-source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'js/[name].[fullhash].js' : 'js/[name].bundle.js',
            publicPath: './',
        },
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, 'dist'),
            open: false,
            compress: true,
            hot: !isProd,
            port: 8080,
        },
        resolve: {
            extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
        },
        module: {
            rules: [
                // JavaScript babel compile
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                // Styles
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    strictMath: true,
                                },
                            },
                        },
                    ],
                },
                // Images
                {
                    test: /\.(png|j?g|svg|gif)?$/,
                    use: 'file-loader',
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                filename: 'index.html',
            }),
            isProd
                ? new MiniCssExtractPlugin({
                      filename: 'styles/[name].[contenthash].css',
                      chunkFilename: '[id].css',
                  })
                : // Only update what has changed on hot reload
                  new webpack.HotModuleReplacementPlugin(),
        ],
        optimization: isProd
            ? {
                  minimize: true,
                  minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
                  // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
                  // instead of having their own. This also helps with long-term caching, since the chunks will only
                  // change when actual code changes, not the webpack runtime.
                  runtimeChunk: {
                      name: 'runtime',
                  },
              }
            : {},
        performance: isProd
            ? {
                  hints: false,
                  maxEntrypointSize: 512000,
                  maxAssetSize: 512000,
              }
            : false,
    };
};
