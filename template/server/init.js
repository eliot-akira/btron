import path from 'path'
import electron, { app, BrowserWindow, crashReporter, ipcMain, Menu } from 'electron'
import windowStateKeeper from 'electron-window-state'
import createAppMenu from './menu'

const dev = process.env.NODE_ENV === 'development'

let mainWindow = null
let winState = null

export default function initApp(config, fn) {

  app.on('window-all-closed', app.quit)

  process.on('uncaughtException', (err) => {
    console.log(err)
    return app.quit()
  })

  const title = config.title != null ? config.title : 'App'

  return app.on('ready', () => {

    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

    const winState = windowStateKeeper({
      defaultWidth: width, //1280,
      defaultHeight: height, //800
    })

    mainWindow = new BrowserWindow({
      title: title,
      width: winState.width, //dev ? 1000 : 600,
      height: winState.height,
      x: winState.x,
      y: winState.y
    })

    createAppMenu(config)

    mainWindow.loadURL('file://' + path.resolve(__dirname, '../client/index.html'))

    mainWindow.on("closed", () => mainWindow = null)

    if (dev) mainWindow.webContents.openDevTools()

    winState.manage(mainWindow)

    app.io = ipcMain
    app.io.send = (key, data) => mainWindow.webContents.send(key, data)
    app.mainWindow = mainWindow

    app.io.on('resize', function(e, { height, width }) {
      return app.mainWindow.setContentSize(width, height)
    })

    return fn(app)
  })
}
