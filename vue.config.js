module.exports = {
    publicPath:
        process.env.NODE_ENV === 'production' ? '/flex-height/' : '/',
    css: {
        extract: false
    }
}
