## Data Validations [![Build Status](https://secure.travis-ci.org/dresende/node-enforce.png?branch=master)](http://travis-ci.org/dresende/node-enforce)

This is the package responsible for data validations in [ORM](http://dresende.github.io/node-orm2).

### Enforce

You can create a list of validations for several properties of an `Object` and then run the checks to
see if everything is OK.

```js
var enforce = require("enforce");
var checks  = new enforce.Enforce();

checks
	.add("name", enforce.notEmptyString())
	.add("age", enforce.ranges.number(18, undefined, "under-age"));

checks.check({
	name : "John Doe",
	age  : 16
}, function (err) {
	// err should have an error with "msg" = "under-age"
});
```

You can pass some options in the constructor. One of them is `returnAllErrors` which makes the validations
be all checked before returning errors. With this option, if any error is found, even if it's only one, it will be
returned in an `Array`.

```js
var enforce = require("enforce");
var checks  = new enforce.Enforce({
	returnAllErrors : true
});

checks
	.add("name", enforce.notEmptyString())
	.add("name", enforce.ranges.length(2)) // yes, you can have multiple validators per property
	.add("age", enforce.ranges.number(18, undefined, "under-age"));

checks.check({
	name : "J",
	age  : 16
}, function (err) {
	console.log(err);
	// [ { [Error: "out-of-range-length"], property: "name", value: "J" },
	//   { [Error: "under-age"], property: "age", value: 16 }]
});
```

### Validators

All validators accept a `msg` argument at the end. These argument is the error message returned if the
validation fails. All validators return a `function` that is called by `Enforce` with the value of the property
in question and a `next` callback.

#### `enforce.required([ msg = "required" ])`

Checks if a property is not `null` and not `undefined`. If can be `false`, `0` or `""`.

#### `enforce.notEmptyString([ msg = "empty-string" ])`

Checks if a property length is not zero. It can actually work with `Array`s.

#### `enforce.lists.inside(Array[, msg = "outside-list" ])`

Checks if the property is inside a list of items (the `Array`).

#### `enforce.lists.outside(Array[, msg = "inside-list" ])`

Checks if the property is not inside a list of items (the `Array`).

#### `enforce.ranges.number(min[, max[, msg = "out-of-range-number" ]])`

Checks if a value is inside a specific range of numbers. Either `min` or `max` can be set to `undefined` meaning
that range side is `Infinity`.

#### `enforce.ranges.length(min[, max[, msg = "out-of-range-length" ]])`

Does the same as the above but for the `length` property.

#### `enforce.security.password([ checks = "luns6", ]msg = "weak-password")`

Checks if a value has some types of characters and a minimal length. `checks` has a default string which means:

- `l`: lowercase letters
- `u`: uppercase letters
- `n`: numbers
- `s`: special characters
- `6`: minimal length of 6

You can of course change this to "lu4" (lowercase, uppercase, minimal length of 4). Please note that if you pass only one argument
to this validator, it will assume it's the `msg` argument. If you want to change the default checks, you have to pass both arguments.

#### `enforce.patterns.match(pattern, modifiers[, msg = "no-pattern-match" ])

Checks if property passes a specific regular expression. You can pass the `pattern` as a `RegExp` object (setting `modifiers` as `null`)
or just pass a regular expression and it will be converted.

#### `enforce.patterns.hexString([ msg = "not-hex-string" ])

Checks if a property matches a predefined `RegExp` object accepting insensitive hexadecimal characters.

#### `enforce.patterns.email([ msg = "not-valid-email" ])

Checks if a property matches a predefined `RegExp` object accepting valid e-mail addresses.

#### `enforce.patterns.ipv4([ msg = "not-valid-ipv4" ])

Checks if a property matches a predefined `RegExp` object accepting valid IPv4 address.
