var fs = require('fs');
var when = require('when');
var nodefn = require('when/node');

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

// consume "readJSON" with promise
readJSON("./sample.json").then(function onSuccess(obj) {
	console.log(obj);
}).otherwise(function noFailure(err) {
	console.error(err);
});