// npm install -g git+ssh://git@github.com:SakerONE/gittify.git

module.exports = function(gulp){
	var git = require('gulp-git'),
		del = require('del'),
		es = require('event-stream'),
		params = require('./src/params'),
		path = require('path'),
		concat = require('gulp-concat');

	gulp.task('clone', function(cb){
		git.clone(params.remote, {args: params.name, cwd: path.join(__dirname, 'gittify')}, cb);
	});

	gulp.task('move', ['clone'], function(){
		return gulp.src('.git/**', {cwd: path.join(__dirname, 'gittify', params.name)})
			.pipe(gulp.dest(path.join(process.cwd(), params.dir, params.name, '.git')));
	});

	gulp.task('gitignore', ['clone'], function(){
		return gulp.src(['./src/.default-gitignore', path.join('./gittify', params.name, '.gitignore')], {cwd: __dirname})
			.pipe(concat('.gitignore'))
			.pipe(gulp.dest(path.join(process.cwd(), params.dir, params.name)));
	});

	gulp.task('clean', ['move', 'gitignore'], function(cb){
		del(['gittify/**', '!gittify'], {force: true, cwd: __dirname}, cb);
	});

	gulp.task('default', ['clean'], function(cb){
		console.log('done');
	});
};