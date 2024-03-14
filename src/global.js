// Polyfill `self` if it's not defined
if (typeof self === 'undefined') {
    global.self = global;
}