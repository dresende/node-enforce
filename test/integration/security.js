var should  = require("should");
var common  = require("../common");
var enforce = require("../..");

describe("enforce.security", function () {
	it("should have .password()", function (done) {
		enforce.security.password.should.be.a("function");

		return done();
	});
});

describe("enforce.security.password()", function () {
	var validator = enforce.security.password();

	it("should pass 'Passw0r∂'", function (done) {
		validator('Passw0r∂', common.checkValidation(done));
	});

	it("should not pass 'password'", function (done) {
		validator('password', common.checkValidation(done, 'weak-password'));
	});

	describe("width custom error", function () {
		var validator = enforce.security.password('custom-error');

		it("should not pass 'password' with 'custom-error'", function (done) {
			validator('password', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.security.password('ln4')", function () {
	var validator = enforce.security.password('ln4', 'weak');

	it("should pass 'Passw0r∂'", function (done) {
		validator('Passw0r∂', common.checkValidation(done));
	});

	it("should pass 'Passw0rd'", function (done) {
		validator('Passw0rd', common.checkValidation(done));
	});

	it("should not pass 'P12345'", function (done) {
		validator('P12345', common.checkValidation(done, 'weak'));
	});

	it("should not pass 'password'", function (done) {
		validator('password', common.checkValidation(done, 'weak'));
	});

	it("should not pass 'p12'", function (done) {
		validator('p12', common.checkValidation(done, 'weak'));
	});
});
