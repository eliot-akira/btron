import gulp from 'gulp'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import minifyCSS from 'gulp-clean-css'
import $if from 'gulp-if'
//import autoprefixer from 'gulp-autoprefixer'

export default ({ src, dest, dev = true, name }, cb) => (done) => (
  gulp.src(src)
    .pipe($if(dev, sourcemaps.init()))
    .pipe(sass({
      keepSpecialComments: false,
      // Resolve require paths for client source
      includePaths: ['./client'],
      //relativeTo: './app',
      processImport: false // ?
    }))
    .on('error', function(e) {
      console.log(e.message)
      this.emit('end')
    })
    //.pipe(autoprefixer({ browsers: ['last 2 versions', 'IE 10', '> 1%'], cascade: false }))
    .pipe($if(!dev, minifyCSS()))
    .pipe(rename(name))
    .pipe($if(dev, sourcemaps.write()))
    .pipe(gulp.dest(dest))
    .on('end', () => {
      if (cb) cb()
      else if (done) done()
    })
)