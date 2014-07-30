var fs = require('fs');
var when = require('when');
var nodefn = require('when/node');
require('es6-shim');

/**
 * Read file async and to parse the content as JSON,
 * return a promise when it succeed,
 * and reject if:
 *  1. the file doesn't exist
 *  2. the file content is not valid JSON
 */
function readJSON(file) {
	return nodefn.call(fs.readFile, file, {
		encoding : 'utf8'
	}).then(function (content) {
		return JSON.parse(content);
	});
}

// read two json files and merge the result of them as one single object
var p1 = readJSON("./sample.json");
var p2 = readJSON("./sample2.json");

// being fault tolerant at the JSON file that fails
when.settle([p1, p2]).then(function onSettled(descriptors) {
	return descriptors.reduce(function onDescriptor(sum, one) {
		if (one.state !== 'rejected') {
			Object.assign(sum, one.value);
		}
		return sum;
	}, {});
}).then(console.log);