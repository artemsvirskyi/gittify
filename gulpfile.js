var gulp = require('gulp'),
	git = require('gulp-git'),
	del = require('del'),
	es = require('event-stream'),
	params = require('./src/params'),
	path = require('path');

gulp.task('clone', function(cb){
	git.clone(params.remote, {args: params.name, cwd: './gittify'}, cb);
});

gulp.task('clean', ['move'], function(cb){
	del(['gittify/**', '!gittify'], {force: true}, cb);
});

gulp.task('move', ['clone'], function(){
	return gulp.src('.git/**', {cwd: path.join('gittify', params.name)})
			   .pipe(gulp.dest(path.join(process.cwd(), params.dir, params.name, '.git')));
});

gulp.task('default', ['clean'], function(cb){
	console.log('done');
});