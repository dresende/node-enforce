var _ = require("lodash");

exports.Enforce = Enforce;

function Enforce(opts) {
	this.validations = {};
	this.options     = _.extend({
		returnAllErrors : false
	}, opts || {});
}

Enforce.prototype.add = function (property, validator) {
	if (typeof validator != "function") {
		throw new Error("Missing validator (function) in Enforce.add(property, validator)");
	}

	if (!this.validations.hasOwnProperty(property)) {
		this.validations[property] = [];
	}
	this.validations[property].push(validator);

	return this;
};

Enforce.prototype.clear = function () {
	this.validations = {};
};

Enforce.prototype.check = function (data, cb) {
	var validations = [];
	var errors      = [];
	var next        = function () {
		if (validations.length === 0) {
			return cb(errors.length > 0 ? errors : null);
		}

		var validation = validations.shift();

		validation.validator(data[validation.property], function (msg) {
			if (msg) {
				var err = new Error(msg);

				err.property = validation.property;
				err.value    = data[validation.property];
				err.msg      = msg;
				err.type     = "validation";

				if (!this.options.returnAllErrors) {
					return cb(err);
				}

				errors.push(err);
			}

			return next();
		}.bind(this));
	}.bind(this);

	for (var k in this.validations) {
		for (var i = 0; i < this.validations[k].length; i++) {
			validations.push({
				property  : k,
				validator : this.validations[k][i]
			});
		}
	}

	return next();
};
