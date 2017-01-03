import gulp from 'gulp'
import eslint from 'gulp-eslint'

export default ({ src }, cb) => () => (
  gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .on('end', () => cb && cb())
)
