import path from 'path'
import gulp from 'gulp'
import $if from 'gulp-if'
import ejs from 'gulp-ejs'
import replace from 'gulp-replace'

// ------------ HTML ------------

export default ({ src, dest, dev = true, electron = true }, cb) => () => {

  const script = !electron ? null :
`<script>
electron = require('electron')
${ dev
   ? `// Live-reload client during development
require('${path.join(__dirname, '../electron-connect/client')}').create()`
   : ''
 }
</script>`

  return gulp.src(src)
    .pipe(ejs({}, { ext: '.html' }))
    .pipe(replace('</head>', `${script}</head>`))
    .pipe(gulp.dest(dest))
    .on('end', () => cb && cb())
}