import gulp from 'gulp'

export default ({ src, dest }, cb) => (done) => (
  gulp
    .src(src)
    .pipe(gulp.dest(dest))
    .on('end', () => {
      cb && cb()
      done && done()
    })
)
