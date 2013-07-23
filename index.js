var common = require("./lib/enforcements/common");

exports.lists = require("./lib/enforcements/lists");
exports.ranges = require("./lib/enforcements/ranges");

for (var k in common) {
	exports[k] = common[k];
}

exports.Enforce = require("./lib/Enforce").Enforce;
