const Path = require("path");
const Express = require("express");
const Webpack = require("webpack");

// Asset proxy
const port = 8081;
const proxy = Express();
proxy.use("/materialize", Express.static(Path.join(__dirname, "..", "node_modules", "materialize-css", "dist")));
proxy.listen(port);

module.exports = {
	entry: Path.join(__dirname, "..", "lib", "contrib", "devapp.js"),
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	output: {
		path: Path.normalize(__dirname),
		filename: "bundle.js"
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin()
	],
	devtool: "source-map",
	devServer: {
		hot: true,
		inline: true,
		contentBase: Path.normalize(__dirname),
		host: "0.0.0.0",
		port: 8080,
		proxy: {
			"/plasma-design/*": {
				target: {
					protocol: "http",
					host: "localhost",
					port: port
				},
				changeOrigin: true,
				secure: false,
				logLevel: "silent"
			},
			"/models/*": {
				target: {
					protocol: "http",
					host: "localhost",
					port: port
				},
				changeOrigin: true,
				secure: false,
				logLevel: "silent"
			}
		}
	}
};
