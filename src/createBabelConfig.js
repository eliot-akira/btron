import fs from 'fs'
import path from 'path'

// Installed inside, i.e., via npm link
let moduleDir = path.join(__dirname, '../node_modules')

try { fs.statSync(moduleDir) }
catch (e) {
  // Installed as devDependency
  moduleDir = path.join(__dirname, '../..')
}

const modulePath = m => path.join(moduleDir, m)

export default function createBabelConfig() {
  return {
    presets: [
      modulePath('babel-preset-es2015'),
      modulePath('babel-preset-stage-0'),
    ],
    plugins: [
      modulePath('babel-plugin-add-module-exports'),
      [modulePath("babel-plugin-transform-runtime"), {
        "polyfill": false,
        "regenerator": true
      }]
    ],
    //babelrc: false // Load .babelrc manually..?
  }
}