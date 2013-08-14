/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />

import Validator = require('../validator');

/**
    * Check if a value matches a given pattern.
    * You can define a pattern string and regex
    * modifiers or just send the RegExp object
    * as 1st argument.
    **/
export function match(pattern: RegExp, message?: string): enforce.IValidator;
export function match(pattern: string, modifiers?: string, message?: string): enforce.IValidator;
export function match(pattern: any, modifiers: string = 'i', message: string = 'no-pattern-match'): enforce.IValidator {
    if (arguments.length == 2) {
        message = modifiers;
        modifiers = 'i';
    }

    if (typeof pattern === 'string') {
        pattern = new RegExp(pattern, modifiers);
    }

    return new Validator((value: string, next) => {
        if (typeof value === 'string' && value.match(pattern)) return next();
        return next(message);
    });
}

/**
    * Check if a value is an hexadecimal string
    * (letters from A to F and numbers).
    **/
export function hexString(message: string = 'not-hex-string'): enforce.IValidator {
    return match("^[a-f0-9]+$", "i", message);
}

/**
    * Check if a value is an e-mail address
    * (simple checking, works 99%).
    **/
export function email(message: string = 'not-valid-email') {
    return match("^[a-z0-9\\._%\\+\\-]+@[a-z0-9\\.\\-]+\\.[a-z]{2,6}$", "i", message);
}

/**
    * Check if it's a valid IPv4 address.
    **/
export function ipv4(message: string = 'not-valid-ipv4'): enforce.IValidator {
    var p1 = "([1-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    var p2 = "([0-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    return match("^" + [p1, p2, p2, p1].join("\\.") + "$", "", message);
}