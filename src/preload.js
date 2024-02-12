const { contextBridge, ipcRenderer } = require("electron");

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld("bdsocket", {
    getSettings: () => ipcRenderer.invoke(
        "LiteLoader.bdsocket.getSettings"
    ),
    setSettings: content => ipcRenderer.invoke(
        "LiteLoader.bdsocket.setSettings",
        content
    ),
});
