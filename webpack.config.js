const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'app.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        fallback: {
            async_hooks: false,
            bufferutil: false,
            fs: false,
            net: false,
            "crypto": false,
            "zlib": false,
            "querystring": false,
            "path": false,
            "stream": false,
            "zlib": false,
            "http": false,
            "https": false,
            "path": false,
            "url": false,
            "buffer": false,
            "util": false,
            "timers": false,
            "tls": false
        }
    }
}  