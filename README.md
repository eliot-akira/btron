
# B-Tron

Bundle Electron projects with live reload

## Install

```bash
npm install btron -g
```

..or as devDependency:

```bash
npm install bob-bundler -D
```

## Commands

**`btron new [app name]`**

- Create a new project folder with basic structure

  /assets - Will be copied to /build

  /client/index.html - Compiled via Ejs

  /client/index.scss - Compiled via Sass

  /client/index.js - Compiled via Sass

  /icons - Icons for packaged app

  /server - Compiled via Babel

  package.json - Dependencies (not devDependency) will be installed in /build

**`btron`**

- Build all
- Watch for file change, then recompile and reload

**`btron [platform]`**

- Package the app for specified platform: `mac`, `win`, `linux`, or `all`
- The app name is from `name` property of the project's `package.json`

## Defaults

The following are included by default.

- Babel presets: `es2015` and `stage-0`
- Babel plugin: `add-module-exports`
