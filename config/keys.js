if (process.env.NODE_ENV === 'production') {
    //we are in production so return prod keys
    module.exports = require ('./prod');
} else {
    //we are in development so return dev keys
    module.exports = require ('./dev');
}