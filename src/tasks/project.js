import path from 'path'
import gulp from 'gulp'
import replace from 'gulp-replace'
import es from 'event-stream'

export default ({ projectRoot, libRoot, args }) => () => {

  const base = path.join(libRoot, 'template')
  const src = [
    `${base}/**`,
    `!${base}/build`, `!${base}/build/**`,
    `!${base}/release`, `!${base}/release/**`,
    `!${base}/package.json`,
    `!${base}/client/index.html`,
  ]
  const dest = args._[0] || projectRoot

  const name = createName(args)
  const placeholder = 'APP_NAME'

  console.log(`Creating new project in ${dest}`)

  return es.merge([

    gulp.src(src, { base })
      .pipe(gulp.dest(dest)),

    gulp.src(`${base}/client/index.html`)
      .pipe(replace(placeholder, name))
      .pipe(gulp.dest(`${dest}/client`)),

    gulp.src(`${base}/package.json`)
      .pipe(replace(placeholder, name))
      .pipe(gulp.dest(dest)),
  ])
}

function createName(args) {

  // App name: --name [name] or created from sub-directory name
  if (args.sub && args.sub.length) {
    return nameFrom(args.sub)
  } else if (args.name) return args.name
  else if (args._[0]) return nameFrom(args._[0])
  else return 'App'
}

function nameFrom(name) {
  name = name.replace(/[-_]+/g, ' ')
  name = name[0].toUpperCase() + name.slice(1)
  return name
}