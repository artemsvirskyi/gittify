var es = require('event-stream');

module.exports = function(){
	return es.map(function(file, cb){
		var str = file.contents.toString(),
			lines = str.split('\n').map(trim).filter(isUnique);

		file.contents = new Buffer(lines.join('\n'));

		cb(null, file);
	});
};

function isUnique(item, index, array){
	return array.indexOf(item) === index;
}

function trim(str){
	return str.trim();
}