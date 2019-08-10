const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify-es').default
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()

const reload = browserSync.reload

function _copyHtml() {
  return src('src/*.html')
    .pipe(dest('dist/'))
}

function _compileScss() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(dest('dist/css'))
}

function _uglifyJs() {
  return src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
}

function _default() {
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  })

  watch('src/*.html', _copyHtml)
  watch('src/scss/*.scss', _compileScss)
  watch('src/js/*.js', _uglifyJs)

  watch('./dist/**/*').on('change', reload);
}

exports.default = _default