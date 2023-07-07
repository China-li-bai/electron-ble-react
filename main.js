// 导入app、BrowserWindow模块

// app 控制应用程序的事件生命周期。事件调用app.on('eventName', callback)，方法调用app.functionName(arg)

// BrowserWindow 创建和控制浏览器窗口。new BrowserWindow([options]) 事件和方法调用同app

// Electron参考文档 https://www.electronjs.org/docs

const { app, BrowserWindow, nativeImage } = require('electron')
const path = require('path')
const reload = require("electron-reloader")
const { blueIpc } = require("./electron/ipc")

try {
  reload(module)
} catch (error) {
  console.error("热更新加载失败：", error)
}

app.allowRendererProcessReuse = true;

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



// In this file you can include the rest of your app's specific main process

// code. You can also put them in separate files and require them here.


function createWindow() {

  // Create the browser window.

  const mainWindow = new BrowserWindow({

    width: 800, // 窗口宽度

    height: 600,  // 窗口高度

    // title: "Electron app", // 窗口标题,如果由loadURL()加载的HTML文件中含有标签<title>，该属性可忽略

    icon: nativeImage.createFromPath('public/favicon.ico'), // "string" || nativeImage.createFromPath('public/favicon.ico')从位于 path 的文件创建新的 NativeImage 实例

    webPreferences: { // 网页功能设置

      webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容

      webSecurity: false, // 禁用同源策略

      preload: path.join(__dirname, './electron/preload/index.js'),

      nodeIntegration: true // 是否启用node集成 渲染进程的内容有访问node的能力,建议设置为true, 否则在render页面会提示node找不到的错误

    }

  })

  // 加载应用 --打包react应用后，__dirname为当前文件路径

  // mainWindow.loadURL(url.format({

  //   pathname: path.join(__dirname, './build/index.html'),

  //   protocol: 'file:',

  //   slashes: true

  // }));

  blueIpc({ mainWindow })
  // 因为我们是加载的react生成的页面，并不是静态页面
  // 所以loadFile换成loadURL。
  // 加载应用 --开发阶段  需要运行 yarn start
  mainWindow.loadURL('http://localhost:3001');
  // 在启动的时候打开DevTools
  mainWindow.webContents.openDevTools()

  // 解决应用启动白屏问题

  mainWindow.on('ready-to-show', () => {

    mainWindow.show();

    mainWindow.focus();

  });
  return mainWindow
}
