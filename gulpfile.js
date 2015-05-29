 
//gulp-notify produces an error, this keeps it silent
process.env.DISABLE_NOTIFIER = true;

///////Require the dependencies///////

var gulp = require('gulp');
    
//-----CSS, SASS, and Styles-----//

var
    //Sass compile
    sass = require('gulp-sass'),
    //Prefixer for different browsers
    autoprefixer = require('gulp-autoprefixer'),
    //Minify Files
    uglify = require('gulp-uglify'),
    //Jade
    jade = require('gulp-jade');

    
    
//-----JAVASCRIPT-----//

var
	//concat all js files into a single file
	concat = require('gulp-concat');

//-----IMAGES-----//
    
var 
	//optimize images
	imagemin = require('gulp-imagemin');
    
//-----Util-----//

var

    //Notify of any changes to files
    notify = require('gulp-notify'),
    //caching
    cache = require('gulp-cache'),
    //browserSync
    browserSync = require('browser-sync').create(),
	//removes build folder each time gulp runs for clean build
    del = require('del'),
	//gets bower components
	bower = require('gulp-bower');



//////Task Area//////

//-----Jade-----//
gulp.task('jade', function() {
	gulp.src('app/index.jade')
	.pipe(jade())
	.pipe(gulp.dest('build'))
	.pipe(notify("Jade task complete"));
});

gulp.task('jadeViews', function() {
	gulp.src('app/**/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('build/views'))
	.pipe(notify("Jade task complete"));
});

//-----Styles-----//

gulp.task('styles', function() {
	
	return gulp.src('app/styles/*.scss')
	.pipe(sass({style: 'expanded'}))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('build/css'))
	.pipe(notify("Styles task complete"));
});

//-----Scripts-----//

gulp.task('scripts', function() {
	gulp.src('app/**/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('build/js'))
	.pipe(notify('Scripts task complete'));
});

//-----Images-----//

gulp.task('images', function() {
	return gulp.src('app/**/*.png')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('build/img'))
	.pipe(notify('Images optimized'));
});

//-----Bower Components-----//
gulp.task('bower', function(){
	return bower()
	
	.pipe(gulp.dest('build/lib'))
	.pipe(notify('Bower Components loaded'));
});

//-----Cleanup-----//

gulp.task('clean', function(callback) {
	del(['build'], callback);
});

//-----Default task-----//

gulp.task('default', ['clean'], function () {
	gulp.start('styles','bower', 'scripts', 'images', 'jade', 'jadeViews', 'browser-sync');
});


//-----Static server Browser Sync-----//

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
	
	gulp.watch('app/styles/*.scss', ['styles']).on('change', browserSync.reload);
	
	gulp.watch('app/**/**/*.js', ['scripts']).on('change', browserSync.reload);
	
	gulp.watch('app/**/**/*.', ['images']).on('change', browserSync.reload);

	gulp.watch('app/**/*.jade', ['jade', 'jadeViews']).on('change', browserSync.reload);
});


