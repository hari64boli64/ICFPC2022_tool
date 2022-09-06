module.exports = {
    mode: 'production',
    // mode: 'development',

    entry: './src/index.ts',
    output: {
        path: __dirname,
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ],
    },
};