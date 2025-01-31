const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true, // Désactive la frame native
        backgroundColor: '#333333', // Ajout d'un fond blanc pour éviter l'invisibilité
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('./src/index.html');
});

ipcMain.on('close-app', () => {
    app.quit();
});

ipcMain.on('minimize-app', () => {
    mainWindow.minimize();
});

ipcMain.on('maximize-app', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});
