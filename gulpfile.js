var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var extname = require('gulp-extname');
var assemble = require('assemble');
var helpers = require('handlebars-helpers');
var path = require('path');
var assembleApp = assemble();

gulp.task('load', function(cb){
  assembleApp.partials('src/fixtures/includes/*.hbs');
  assembleApp.pages('src/fixtures/pages/*.hbs');
  assembleApp.data({site: {title: 'site-title11'}});

  assembleApp.options = {
      layout: 'src/fixtures/layouts/default.hbs',
      options: {
          helpers: ['./node_modules/handlebars-helpers/lib/helpers/*.js' ]
        }
  }

  assembleApp.helper('echoTxt', function(txt) {
    return 'some txt' + txt;
  });

  cb();
});

gulp.task('default', function () {
	gulp.watch([
	    'src/fixtures/pages/**'
	], ['hbs']);
});

gulp.task('hbs', ['load'], function () {
   return assembleApp.toStream('pages')
    .pipe(assembleApp.renderFile())
    .on('error', console.log)
    // .pipe(htmlmin())
    .pipe(extname())
    .pipe(assembleApp.dest('dist/html/'));

});
