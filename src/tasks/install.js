import gulp from 'gulp'
import { execSync } from 'child_process'

// Install node_modules (only dependencies) in build folder

export default ({ destRoot }, cb) => {
  execSync('npm install --prune --production --silent', { cwd: destRoot })
  console.log('Installed npm modules')
  cb && cb()
}
