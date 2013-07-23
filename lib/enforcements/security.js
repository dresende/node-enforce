exports.password = function (checks, msg) {
	if (!msg) {
		msg    = checks;
		checks = "luns6"; // (l)owercase, (u)ppercase, (n)umber, (s)pecial characters, (6) min length
	}
	if (!msg) {
		msg    = "weak-password";
	}
	var m = checks.match(/([0-9]+)/);
	var min_len = (m ? parseInt(m[1], 10) : null);

	return function (v, next) {
		if (!v) return next(msg);

		if (checks.indexOf("l") >= 0 && !v.match(/[a-z]/)) return next(msg);
		if (checks.indexOf("u") >= 0 && !v.match(/[A-Z]/)) return next(msg);
		if (checks.indexOf("n") >= 0 && !v.match(/[0-9]/)) return next(msg);
		if (checks.indexOf("s") >= 0 && !v.match(/[^a-zA-Z0-9]/)) return next(msg);
		if (min_len !== null && min_len > v.length) return next(msg);

		return next();
	};
};
