#!/usr/bin/env node
var gulpfile = require('./gulpfile'),
	gulp = require('gulp');

gulpfile(gulp);
gulp.start('default');