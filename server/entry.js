require('babel-core/register');
require('babel-polyfill');

// Any file imported using require will be transformed by babel
require('./core/loader.js');
