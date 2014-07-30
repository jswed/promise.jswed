var fs = require('fs');
var when = require('when');
/**
 * Read file async and to parse the content as JSON
 */
function readJSON(file) {
	var df = when.defer();
	fs.readFile(file, {
		encoding : 'utf8'
	}, function (er, content) {
		if (er) {
			df.reject(er);
		}
		try {
			df.resolve(JSON.parse(content));
		} catch (er) {
			df.reject(er);
		}
	});
	return df.promise;
}

// consume "readJSON" with promise
readJSON("./sample.json").then(function onSuccess(obj) {
	console.log(obj);
}).otherwise(function noFailure(err) {
	console.error(err);
});