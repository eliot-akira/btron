import gulp from 'gulp'
import eslint from 'gulp-eslint'

export default ({ src }, cb) => (done) => (
  gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .on('end', () => {
      if (cb) cb()
      else if (done) done()
    })
)
