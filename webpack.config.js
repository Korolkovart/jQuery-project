const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require("node-sass-glob-importer");
const TerserPlugin = require("terser-webpack-plugin");

let mode = "production";

module.exports = {
    mode: mode,
    entry: {
        vendor: ["./src/js/jquery-ui.js"],
        scripts: {
            dependOn: "vendor",
            import: ["./src/js/script.js", "./src/js/tabs.js"]
        },
    },
    resolve: {
        extensions: [".js"],
    },

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./js/[name].min.js",
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg)$/,
                type: "asset/resource",
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: { sassOptions: { importer: globImporter() } },
                    },
                ],
            },
        ],
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: "./src/index.html",
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "./css/styles.min.css",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        hot: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};
