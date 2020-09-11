const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const baseOptions = {
  mode: process.env.NODE_ENV,
//   devtool: "source-map",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {},
      },
    //   {
    //     test: /\.tsx?$/,
    //     use: [
    //       {
    //         loader: "awesome-typescript-loader",
    //       },
    //     ],
    //     exclude: /node_modules/,
    //   },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
         
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]",
        },
      },
    ],
  },
  plugins: [
     new VueLoaderPlugin()
  ]
};

module.exports = baseOptions;
