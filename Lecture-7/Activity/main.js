//open terminal in activity folder
//npm init -y
//npm install electrom --save-dev
//create main.js
//go to pacakage.json => write main.js instead of index.js
//script => start script: "electron ."
//We always have to write the below code because it will open the blank app

const electron = require("electron");
// npm install ejs-electron
const ejs = require("ejs-electron");
ejs.data({
    "title": "New Excel Sheet"
})
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("index.ejs").then(function(){
        win.maximize();
        win.removeMenu();
        win.webContents.openDevTools();
    })
}

app.whenReady().then(createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

