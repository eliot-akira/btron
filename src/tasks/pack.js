import packager from 'electron-packager'
import prebuilt from 'electron/package.json'

export default ({ src, platform, dest, projectRoot }, cb) => (done) => {

  packager({

    // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md

    platform, // linux, win32, darwin, mas, all
    arch: 'x64',
    dir: src,
    out: dest,
    overwrite: true,
    asar: true,
    electronVersion: prebuilt.version,

    icon: `${projectRoot}/icons/icon`, // .icns or .ico
    // Icon for Linux:
    // The dock/window list icon is set via the icon option in the BrowserWindow constructor
    // http://electron.atom.io/docs/api/browser-window/#new-browserwindowoptions

    // prune: true, // Doesn't work as expected: npm install from build
    //download: { cache: 'dir' },
    //'app-copyright': '',
    //'app-version': '',
    //'build-version': '?'

  }, (err, appPaths) => {
    if (err) console.error(err.message, appPaths)
    else {
      console.log('Packaged', appPaths[0])
      //execSync('', {cwd: `${dest}/`})
    }
    if (cb) cb(err, appPaths)
    else if (done) done()
  })

}

// For branding the app, see documentation for electronPackager()
// https://github.com/joaomoreno/gulp-atom-electron
/*
import gulp from 'gulp'
import path from 'path'
import electronPackager from 'gulp-atom-electron'
import symdest from 'gulp-symdest'
import zip from 'gulp-vinyl-zip'
import $if from 'gulp-if'

  gulp.src(src)
    .on('error', (e) => console.log(e))
    .pipe(electronPackager({
      version: prebuilt.version, platform: platform,
      winIcon: `${src}/icon.ico`,
      darwinIcon: `${src}/icon.icsn`
    }))
    .pipe($if(platform==='darwin', symdest(dest), zip.dest(dest)))
    .on('end', () => cb && cb())

*/