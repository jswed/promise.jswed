var fs = require('fs');

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
readJSON("./sample.json", function onSuccess(obj) {
	console.log(obj);
}, function (err) {
	console.error(err);
});