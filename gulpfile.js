var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')({camelize:true});


// Paths
// =======================================================

var paths = {
  jade: 'app/**/*.jade',
  icons: 'app/assets/fonts/svg/*.svg',
  scss: 'app/assets/css/**/*.scss',
  js: 'app/assets/js/**/*.js',
  images: 'app/assets/img/**'
};


// HTML
// =======================================================

gulp.task('html', function() {
  return gulp.src(paths.jade)
    .pipe(plugin.jade())
    .pipe(gulp.dest('build'))
    .pipe(plugin.connect.reload());
});


// Icon Fonts
// =======================================================

gulp.task('iconfont', function(){
  return gulp.src(paths.icons)
    .pipe(plugin.svgmin())
    .pipe(plugin.iconfontCss({
      fontName: 'icon-font',
      path: 'app/assets/fonts/_icon-font.scss',
      targetPath: '../../../app/assets/css/generated/_icon-font.scss',
      fontPath: '../fonts/'
    }))
    .pipe(plugin.iconfont({
      fontName: 'icon-font',
      normalize: true
    }))
    .pipe(gulp.dest('build/assets/fonts/'));
});


// CSS
// =======================================================

gulp.task('css', ['iconfont'], function() {
  return gulp.src(paths.scss)
    .pipe(plugin.sass())
    .pipe(plugin.autoprefixer("last 1 version"))
    .pipe(plugin.minifyCss())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(plugin.connect.reload());
});


// JS
// =======================================================

gulp.task('js', function() {
  return gulp.src([
      'app/assets/js/vendor/*.js',
      'app/assets/js/plugins/*.js',
      'app/assets/js/scripts.js',
      'app/assets/js/skills.js'
    ])
    .pipe(plugin.concat('scripts.min.js'))
    .pipe(plugin.uglify())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(plugin.connect.reload());
});


// Images
// =======================================================

gulp.task('optimizeImages', function() {
  return gulp.src(paths.images)
    .pipe(plugin.newer('build/assets/img'))
    .pipe(plugin.imagemin())
    .pipe(gulp.dest('app/assets/img/'));
});

gulp.task('cleanImages', ['optimizeImages'], function() {
  return gulp.src('build/assets/img')
    .pipe(plugin.clean());
});

gulp.task('copyImages', ['cleanImages'], function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('build/assets/img'));
});


// Watch
// =======================================================

gulp.task('watch', ['compile'], function() {
  gulp.watch(paths.jade, ['html']);
  gulp.watch(paths.icons, ['css']);
  gulp.watch([paths.scss, '!app/assets/css/generated/_icon-font.scss'], ['css']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.images, ['copyImages']);
});


// Server
// =======================================================

gulp.task('connect', function() {
  plugin.connect.server({
    root: 'build',
    port: '8000',
    livereload: true
  });
});


// Tasks
// =======================================================

gulp.task('default', ['watch', 'connect']);
gulp.task('compile', ['html', 'css', 'js', 'copyImages']);

gulp.task('deploy', function () {
  gulp.src("build/*")
  .pipe(deploy(gitRemoteUrl, remote))
  .pipe(deploy(branch, 'master'));
});