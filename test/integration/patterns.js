var should  = require("should");
var common  = require("../common");
var enforce = require("../..");

describe("enforce.patterns", function () {
	it("should have .match()", function (done) {
		enforce.patterns.match.should.be.a("function");

		return done();
	});
	it("should have .hexString()", function (done) {
		enforce.patterns.hexString.should.be.a("function");

		return done();
	});
	it("should have .email()", function (done) {
		enforce.patterns.email.should.be.a("function");

		return done();
	});
	it("should have .ipv4()", function (done) {
		enforce.patterns.ipv4.should.be.a("function");

		return done();
	});

	describe("with custom error", function () {
	    it("should fail 'abc' on /def/ with 'invalid'", function (done) {
	        enforce.patterns.match(/def/, 'invalid').validate('abc', common.checkValidation(done, 'invalid'));
	    });
	});
});

describe("enforce.patterns.hexString()", function () {
	var validator = enforce.patterns.hexString();

	it("should pass 'ABCDEF0123456789'", function (done) {
		validator.validate('ABCDEF0123456789', common.checkValidation(done));
	});

	it("should pass 'abcdef0123456789'", function (done) {
		validator.validate('abcdef0123456789', common.checkValidation(done));
	});

	it("should not pass 'af830g'", function (done) {
		validator.validate('af830g', common.checkValidation(done, 'not-hex-string'));
	});

	it("should not pass ''", function (done) {
		validator.validate('', common.checkValidation(done, 'not-hex-string'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-hex-string'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-hex-string'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.hexString('custom-error');

		it("should not pass 'af830g' with 'custom-error'", function (done) {
			validator.validate('af830g', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.email()", function () {
	var validator = enforce.patterns.email();

	it("should pass 'niceandsimple@example.com'", function (done) {
		validator.validate('niceandsimple@example.com', common.checkValidation(done));
	});

	it("should pass 'Very.Common@example.com'", function (done) {
		validator.validate('Very.Common@example.com', common.checkValidation(done));
	});

	it("should pass 'disposable.style.email.with+symbol@example.com'", function (done) {
		validator.validate('disposable.style.email.with+symbol@example.com', common.checkValidation(done));
	});

	it("should not pass 'Abc.example.com'", function (done) {
		validator.validate('Abc.example.com', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass 'A@b@c@example.com'", function (done) {
		validator.validate('A@b@c@example.com', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass 'not\\allowed@example.com'", function (done) {
		validator.validate('not\\allowed@example.com', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass 'abc@example'", function (done) {
		validator.validate('abc@example', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-email'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.email('custom-error');

		it("should not pass 'abc@example' with 'custom-error'", function (done) {
			validator.validate('abc@example', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.ipv4()", function () {
	var validator = enforce.patterns.ipv4();

	it("should pass '1.2.3.4'", function (done) {
		validator.validate('1.2.3.4', common.checkValidation(done));
	});

	it("should pass '1.0.0.1'", function (done) {
		validator.validate('1.0.0.1', common.checkValidation(done));
	});

	it("should pass '1.10.100.254'", function (done) {
		validator.validate('1.10.100.254', common.checkValidation(done));
	});

	it("should not pass '1.10.100.255'", function (done) {
		validator.validate('1.10.100.255', common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass '1.10.100.0'", function (done) {
		validator.validate('1.10.100.0', common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass '0.1.2.3'", function (done) {
		validator.validate('0.1.2.3', common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.ipv4('custom-error');

		it("should not pass '0.1.2.3' with 'custom-error'", function (done) {
			validator.validate('0.1.2.3', common.checkValidation(done, 'custom-error'));
		});
	});
});
