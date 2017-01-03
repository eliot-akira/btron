import gulp from 'gulp'
import browserify from 'gulp-bro'
import rename from 'gulp-rename'
import babelify from 'babelify'
import uglify from 'gulp-uglify'
import $if from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'

export default ({ src, dest, dev = true, name }, cb) => (done) => (
  gulp.src(src, { read: false }) // recommended option for gulp-bro
  .pipe(browserify({
    entries: [src],
    debug: dev, // Source maps
    transform: [babelify],
    // Resolve require paths for client source and shared lib
    paths: ['./client']
  }))
  .pipe($if(!dev, uglify()))
  .pipe(rename(name))
  .pipe(gulp.dest(dest))
  .on('error', function(e) {
    console.log(e.message)
    this.emit('end')
  })
  .on('end', () => {
    if (cb) cb()
    else if (done) done()
  })
)
