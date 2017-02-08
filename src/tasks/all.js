import gulp from 'gulp'
import watch from 'gulp-watch'
//import remove from 'gulp-rm'
import css from './css'
import html from './html'
import js from './js'
import copy from './copy'
import project from './project'
import packElectron from './pack'
import buildServer from './server'
import install from './install'
//import lint from './lint'
import createBabelConfig from '../createBabelConfig'

module.exports = ({ client, server, pack, args, projectRoot, libRoot, electron }) => {

  process.env.IS_ELECTRON = 'true'

  const config = {
    js: { src: `${client.src}/index.js`, dest: client.dest, name: 'app.js' },
    css: { src: `${client.src}/index.scss`, dest: client.dest, name: 'app.css' },
    html: { src: `${client.src}/index.html`, dest: client.dest, electron },
    assets: { src: `${client.assets}/**/*`, dest: client.dest },
    package: { src: pack.src, dest: pack.dest, projectRoot },
    server: {
      src: [`${server.src}/**/*.js`], dest: server.dest,
      srcRoot: server.src, destRoot: pack.src,
      projectRoot,
      electron
    }
  }

  const tasks = {
    js: js({ ...config.js, dev: false }),
    css: css({ ...config.css, dev: false }),
    html: html({ ...config.html, dev: false }),
    assets: copy(config.assets),
    buildServer: buildServer(config.server),

    jsDev: js(config.js),
    cssDev: css(config.css),
    htmlDev: html(config.html),

    install: () => install(config.server),

    //lintClient: lint({ src: `${client.src}/**/*.js` }),
    //lintServer: lint({ src: `${server.src}/**/*.js` }),
    //lint: ['lintClient', 'lintServer'],

    new: project({ projectRoot, libRoot, args })
  }

  for (let name in tasks) gulp.task(name, tasks[name])

  gulp.task('build', gulp.parallel(
    ['js', 'css', 'html', 'assets'].concat(electron ? ['buildServer'] : [])
  ))

  gulp.task('buildDev', gulp.parallel(
    ['jsDev', 'cssDev', 'htmlDev', 'assets', 'buildServer']
  ))

  // TODO: Webpack, BrowserSync, Nodemon..?
  // https://github.com/sogko/gulp-recipes/blob/master/browser-sync-nodemon-expressjs/gulpfile.js

  // ------------ Electron: Server ------------

  gulp.task('serve', gulp.series('buildDev', () => {

    const babel = require('gulp-babel')
    const electronServer = require('../electron-connect/server')
    const { start, reload, restart } = electronServer.create({
      path: `./${config.server.dest}`,
      logLevel: 0
    })

    process.env.NODE_ENV = 'development'

    start()

    watch(`${client.src}/**/*.js`, js(config.js, reload))
    watch(`${client.src}/**/*.scss`, css(config.css, reload))
    watch(`${client.src}/**/*.html`, html(config.html, reload))

    // Copy changed asset file
    gulp.watch(`${client.assets}/**`)
      .on('change', (filePath) => {
        return gulp.src(filePath, { base: client.assets })
          .pipe(gulp.dest(client.dest))
      })

    // Compile changed server file
    gulp.watch(config.server.src)
      .on('change', (filePath) => {
        return gulp.src(filePath, { base: server.src })
          .pipe(babel(createBabelConfig()))
          .on('error', function(e) {
            console.log(`\nERROR: ${e.message}\n`)
            this.emit('end')
          })
          .pipe(gulp.dest(config.server.dest))
          .on('end', restart)
      })
  }))

  // ------------ Electron: Package ------------

  gulp.task('mac', gulp.series('build',
    packElectron({ ...config.package, platform: 'darwin' })
  ))

  gulp.task('win', gulp.series('build',
    packElectron({ ...config.package, platform: 'win64', dest: `${pack.dest}/windows.zip` })
  ))

  gulp.task('linux', gulp.series('build',
    packElectron({ ...config.package, platform: 'linux', dest: `${pack.dest}/linux.zip` })
  ))

  gulp.task('all', gulp.parallel('mac', 'win', 'linux'))

  gulp.task('default', gulp.series('serve'))


}
