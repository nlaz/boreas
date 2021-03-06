var nodeExternals = require("webpack-node-externals");
var paths = require("./paths");

var publicPath = "/";
var config = {
  target: "node",
  entry: ["babel-polyfill", paths.serverIndexJs],
  output: {
    path: paths.serverBuild,
    filename: "bundle.server.js",
    publicPath: publicPath,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  externals: [
    nodeExternals({
      modulesDir: "node_modules",
      whitelist: ["react-dom/server", "react/addons"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
};

module.exports = config;
