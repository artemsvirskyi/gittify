var	name = args[2],
	dir = 'app/components',
	shorthandResolver = 'git@git.qapint.com:{{owner}}/{{package}}.git',
	remote = getRemote(shorthandResolver, name);

function getRemote(shorthandResolver, name){
	var interpolate = require('interpolate'),
		component = require('../bower.json').dependencies[name];

	component = component.split('#')[0].split('/');

	return interpolate(shorthandResolver, {owner: component[0], package: component[1]}, { delimiter: '{{}}'});
}

module.exports = {
	name: name,
	dir: dir,
	remote: remote
};