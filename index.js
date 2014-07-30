var fs = require('fs');
var when = require('when');
var callbacks = require('when/callbacks');

/**
 * Read file async and to parse the content as JSON,
 * invoke the first callback if succeed, invoke the second
 * callback if:
 *  1. the file doesn't exist
 *  2. the file content is not valid JSON
 */
function readJSON(file, success, failure) {
	fs.readFile(file, {
		encoding : 'utf8'
	}, function (err, content) {
		if (err) {
			failure(err);
		}
		try {
			success(JSON.parse(content));
		} catch (er) {
			failure(er);
		}
	});
}

// use "readJSON", whether succeed or not, log the file name that we read from
var file_to_read = "./sample.json";
callbacks.call(readJSON, file_to_read).then(console.log).ensure(function () {
	console.log("attempted to read file: %s", file_to_read);
});