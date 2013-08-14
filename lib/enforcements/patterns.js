/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
var Validator = require('../validator');

function match(pattern, modifiers, message) {
    if (typeof modifiers === "undefined") { modifiers = 'i'; }
    if (typeof message === "undefined") { message = 'no-pattern-match'; }
    if (arguments.length == 2) {
        message = modifiers;
        modifiers = 'i';
    }

    if (typeof pattern === 'string') {
        pattern = new RegExp(pattern, modifiers);
    }

    return new Validator(function (value, next) {
        if (typeof value === 'string' && value.match(pattern))
            return next();
        return next(message);
    });
}
exports.match = match;

/**
* Check if a value is an hexadecimal string
* (letters from A to F and numbers).
**/
function hexString(message) {
    if (typeof message === "undefined") { message = 'not-hex-string'; }
    return exports.match("^[a-f0-9]+$", "i", message);
}
exports.hexString = hexString;

/**
* Check if a value is an e-mail address
* (simple checking, works 99%).
**/
function email(message) {
    if (typeof message === "undefined") { message = 'not-valid-email'; }
    return exports.match("^[a-z0-9\\._%\\+\\-]+@[a-z0-9\\.\\-]+\\.[a-z]{2,6}$", "i", message);
}
exports.email = email;

/**
* Check if it's a valid IPv4 address.
**/
function ipv4(message) {
    if (typeof message === "undefined") { message = 'not-valid-ipv4'; }
    var p1 = "([1-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    var p2 = "([0-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    return exports.match("^" + [p1, p2, p2, p1].join("\\.") + "$", "", message);
}
exports.ipv4 = ipv4;

