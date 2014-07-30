var fs = require('fs');
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

// use "readJSON"
callbacks.call(readJSON, "./sample.json").then(console.log);