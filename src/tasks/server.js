import fs from 'fs'
import path from 'path'
import es from 'event-stream'
import gulp from 'gulp'
import babel from 'gulp-babel'
import replace from 'gulp-replace'
import install from './install'
import createBabelConfig from '../createBabelConfig'

export default ({ src, dest, srcRoot, destRoot, projectRoot, electron = true }, cb) => (done) => {

  let stream = gulp.src(src)
    .pipe(babel(createBabelConfig())) // { presets: ['es2015'] }
    .on('error', function(e) {
      console.log(e.message)
      this.emit('end')
    })
    .pipe(gulp.dest(dest))

  if (electron) stream = es.merge([stream,
    gulp.src(`${projectRoot}/package.json`)
      // Point to server folder inside build
      .pipe(replace(`./build/server/index.js`, `./server/index.js`))
      .pipe(gulp.dest(destRoot))
  ])

  return stream.on('end', () => {

    try { fs.statSync(path.join(destRoot, 'node_modules')) }
    catch (e) {
      // Install node_modules (only dependencies) in build folder
      install({ destRoot })
    }
    if (cb) cb()
    else if (done) done()
  })
}
