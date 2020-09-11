const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const publicPath = "/";
const baseOptions = {
  mode: process.env.NODE_ENV,
  //   devtool: "source-map",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name]_[chunkhash].js",
    publicPath,
  },
  resolve: {
    extensions: [".vue", ".ts", ".tsx", ".js", ".jsx"],
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
        loader: "babel-loader",
        include: [],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]",
          publicPath: publicPath + "img/",
          outputPath: "img/",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]",
          publicPath: publicPath + "style/",
          outputPath: "style/",
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

module.exports = baseOptions;
