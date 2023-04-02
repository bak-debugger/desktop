const express = require('express');
const expressApp = express();
const http = require('http');
const server = http.createServer(expressApp);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        win.loadFile('../dist/index.html');
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

expressApp.use(express.json())

expressApp.post('/event', (req, res) => {
    io.emit('event', req.body);
    res.send(true);
});

server.listen(54331);