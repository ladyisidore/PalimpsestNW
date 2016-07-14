var gulp     = require('gulp'),
    concat   = require('gulp-concat'),
    rename   = require('gulp-rename'),
    minify   = require('gulp-cssnano'),
    uglify   = require('gulp-uglify'),
    styl     = require('gulp-stylus'),
    jeet     = require('jeet'),
    rupture  = require('rupture'),
    axis     = require('axis'),
    pug      = require('gulp-pug');

var paths = {
    dist: './dist/palimpsest-nw',
    fonts: './assets/fonts',
    bower: './bower_components',
    html: {
        src: './src/html/**/**.pug',
        dest: './'
    },
    styles: {
        src: './src/styl/main.styl',
        dest: './assets/css'
    },
    scripts: {
        src: './src/js/**/*.js',
        dest: './assets/js/'
    }
};

// moves the ink.iife.js file from the bower directory to the Palimpsest.NW main directory
function copy(done) {
    gulp.src(paths.bower + '/inkjs/ink.iife.js')
        .pipe(gulp.dest('./assets/js'))
    done();
}

// compiles stylus into css, compresses the result and renames it
function css() {
    return gulp.src(paths.styles.src)
        .pipe(styl({
                use: [
                    axis(),
                    jeet(),
                    rupture()
                ],
                compress: true
            }))
        .pipe(rename({
                main: 'styles',
                suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

// concats javascript files, uglifies (compresses) them
function js() {
    return gulp.src([
            paths.bower + '/jquery/dist/jquery.js',
            paths.bower + '/jquery.scrollTo/jquery.scrollTo.js',
            paths.scripts.src
            ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// compiles the .pug files to html
function html() {
    return gulp.src([paths.html.src])
        .pipe(pug())
        .pipe(gulp.dest(paths.html.dest));
}

// copies all required files to dist/palimpsest-nw
function dist(done) {
    gulp.src(paths.styles.dest + '/**.min.css')
        .pipe(gulp.dest(paths.dist + '/assets/css/'))
    gulp.src(paths.scripts.dest + '/**.js')
        .pipe(gulp.dest(paths.dist + '/assets/js/'))
    gulp.src(paths.fonts + '/**/**.**')
        .pipe(gulp.dest(paths.dist + '/assets/fonts'))
    gulp.src([
            './index.html',
            './package.json',
            './the-intercept.json' // replace with the path to your game's .json
            ])
        .pipe(gulp.dest(paths.dist))
    done();
}

// automatically executes compilation tasks when watched files change
function watch() {
    gulp.watch(paths.styles.src, css);
    gulp.watch(paths.scripts.src, js);
    gulp.watch(paths.html.src, html);
}

exports.watch = watch;

var compile = gulp.parallel(
        css,
        js,
        html
    );

// run at the start
gulp.task('init', copy);

// compiles the CSS
gulp.task('css', css);

// compiles the JavaScript
gulp.task('js', js);

// compiles the HTML
gulp.task('html', html);

// compiles all files
gulp.task('compile', compile);

// compiles all files and moves all required files to dist/palimpsest-nw
gulp.task('dist', gulp.series(
        compile,
        dist
    ));

// default task; executes the watch task
gulp.task('default', watch);