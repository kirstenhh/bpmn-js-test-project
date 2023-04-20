const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: 'development',
    devServer: {
		static: '../dist',
		open: ['/index.html?articleid=1'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
            {
				test: /\.bpmnlintrc$/,
				use: ['bpmnlint-loader'
				]
			}
        ]
    },
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
}