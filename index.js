var fs = require('fs');
var when = require('when');
var nodefn = require('when/node');
var pipeline = require('when/pipeline');
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

/**
 * Write the JSON string to the specified file
 * return a promise when it succeed, and reject if cannot write to the file
 */
function writeJSON(file, content) {
	return nodefn.call(fs.writeFile, file, content);
}

// read two json files and merge the result of them as one single object
var p1 = readJSON("./sample.json");
var p2 = readJSON("./sample2.json");

var result_file = "./aggregate.json";
// a competitive race that the faster one wins
pipeline([
	function read() {
		return when.join(p1, p2).spread(function onBothSuccess(obj1, obj2) {
			return Object.assign(obj1, obj2);
		});;
	}, function write(content) {
		return writeJSON(result_file, JSON.stringify(content, null, '  '));
	}
]).then(function onAggregated() {
	console.log(fs.readFileSync(result_file, 'utf8'));
});