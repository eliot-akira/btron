import gulp from 'gulp'

export default ({ src, dest }, cb) => () => (
  gulp
    .src(src)
    .pipe(gulp.dest(dest))
    .on('end', () => cb && cb())
)
