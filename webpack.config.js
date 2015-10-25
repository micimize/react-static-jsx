var webpack = require("webpack");
var path = require("path");

module.exports = {
    target:  "node",
    cache:   false,
    context: __dirname,
    devtool: "source-maps",
    entry:   ["./src/Static.jsx"],
    output:  {
        library: "react-static-jsx",
        libraryTarget: "commonjs2",
        path:     path.join(__dirname, "dist"),
        filename: "static.js"
    },
    externals: { 'bundle!react': 'react' },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    module:  {
        loaders: [
            {
            include: /\.js$|\.jsx$/,
            loaders: [ "babel-loader?stage=0&optional=runtime&plugins=typecheck" ], 
            exclude: /node_modules/
        }
        ]
    },
    resolve: {
        modulesDirectories: [ "src", "node_modules", "web_modules" ],
        extensions: ["", ".json", ".js", ".jsx"]
    },
    node:    {
        __dirname: true,
        fs:        'empty'
    }
};
