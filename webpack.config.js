var webpack = require("webpack");
var path = require("path");

module.exports = {
	target:  "web",
	cache:   false,
	context: __dirname,
	devtool: false,
	entry:   ["./src/Static.jsx"],
	output:  {
		path:          path.join(__dirname, "dist"),
		filename:      "static.js",
		chunkFilename: "[name].[id].js"
	},
	module:  {
		loaders: [
			{include: /\.json$/, loaders: ["json-loader"]},
			{
                include: /\.js$|\.jsx$/,
                loaders: [ "babel-loader?stage=0&optional=runtime&plugins=typecheck" ], 
                exclude: /node_modules/
            }
		]
	},
	resolve: {
		modulesDirectories: [
			"src",
			"node_modules",
			"web_modules"
		],
		extensions: ["", ".json", ".js", ".jsx"]
	},
	node:    {
		__dirname: true,
		fs:        'empty'
	}
};
