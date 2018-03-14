
# B-Tron

Bundle [Electron](http://electron.atom.io/) projects with live reload

## Install

```bash
npm install btron -g
```

..or as devDependency:

```bash
npm install btron -D
```

## Commands

**`btron new [app name]`**

- Create a new project folder with basic structure

  `/assets` - Contents will be copied to `/build`

  `/client/index.html` - Compiled via [Ejs](http://ejs.co/)

  `/client/index.scss` - Compiled via [Sass](https://sass-lang.com/)

  `/client/index.js` - Compiled via [Browserify](http://browserify.org/)

  `/icons` - Icons for packaged app

  `/server` - Compiled via [Babel](https://babeljs.io/)

  `package.json` - Dependencies (not devDependency) will be installed in `/build`

**`btron`**

- Build the app, watch for file change, then recompile and reload

**`btron [platform]`**

- Package the app for specified platform: `mac`, `win`, `linux`, or `all`
- The app name is from `name` property of the project's `package.json`

## Defaults

The following are included by default.

- Babel presets: `env`, `stage-0` and `react`
- Babel plugin: `add-module-exports`
