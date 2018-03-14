import fs from 'fs'
import path from 'path'

// Installed inside, i.e., via npm link
let moduleDir = path.join(__dirname, '../node_modules')

try {
  // Check if deps installed
  fs.statSync(path.join(moduleDir, 'babel-preset-env'))
}
catch (e) {
  // Installed as devDependency
  moduleDir = path.join(__dirname, '../..')
}

const modulePath = m => path.join(moduleDir, m)

export default function createBabelConfig() {
  return {
    presets: [
      [modulePath('babel-preset-env'), {
        targets: { browsers: ['last 2 versions'] },
        useBuiltIns: true
      }],
      modulePath('babel-preset-stage-0'),
      modulePath('babel-preset-react'),
    ],
    plugins: [
      modulePath('babel-plugin-add-module-exports'),
      [modulePath('babel-plugin-module-resolver'), {
        // root, alias
      }],
      [modulePath("babel-plugin-transform-runtime"), {
        "polyfill": false,
        "regenerator": true
      }]
    ],
    //babelrc: false // Load .babelrc manually..?
  }
}