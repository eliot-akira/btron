import path from 'path'
import minimist from 'minimist'
import gulp from 'gulp'

// Optional: build in sub-directory: --sub [name]
const args = minimist(process.argv.slice(2))
const dir = (args.sub && args.sub.length) ? `projects/${args.sub}/` : ''
const src = args.src ? `/${args.src}` : ''

let command = 'serve'

if (args._.length) {
  command = args._[0]
  args._.shift()
}

const config = {
  args,
  dir,
  //dev: process.env.NODE_ENV !== 'production',
  electron: !args.web,
  projectRoot: process.cwd(),
  libRoot: path.resolve(__dirname, '..'),
  client: {
    src: `${dir}client${src}`,
    dest: args.client || `${dir}build/client`,
    assets: `${dir}assets`
  },
  server: {
    src: `${dir}server`,
    dest: args.server || `${dir}build/server`
  },
  pack: {
    src: `${dir}build`,
    dest: `${dir}release`
  }
}

//for (let key in config) console.log(key, config[key])

require('./tasks/all')(config)

gulp.start(command)