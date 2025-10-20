const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // 隐藏菜单栏
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // 监听主窗口的控制台消息
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[Main Window Console] ${message}`);
  });

  // 当页面加载完成时，为 webview 添加事件监听器
  mainWindow.webContents.on('did-finish-load', () => {
    // 注入脚本来监听 webview 的控制台消息
    mainWindow.webContents.executeJavaScript(`
      // 为所有现有的 webview 添加监听器
      const webviews = document.querySelectorAll('webview');
      webviews.forEach(webview => {
        webview.addEventListener('console-message', (e) => {
          console.log(\`[Webview Console - \$\{webview.id\}] \$\{e.message\}\`);
        });
        
        webview.addEventListener('did-fail-load', (e) => {
          console.log(\`[Webview Error - \$\{webview.id\}] Failed to load: \$\{e.errorDescription\}\`);
        });
      });
    `);
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.