//导入必须库
const fs = require("fs");
const path = require("path");
const {
    BrowserWindow,
    ipcMain
} = require("electron");

//插件信息
const slug = "bdsocket";
const pluginDataPath = LiteLoader.plugins[slug].path.data;
const settingsPath = path.join(pluginDataPath, "settings.json");
const plugin_path = LiteLoader.plugins[slug].path.plugin;

//导入自己的库
const WebsocketServer = require('./server/server.js');

//检查配置文件完整性
function checkAndCompleteKeys(json1, json2, check_key) {
    const keys1 = Object.keys(json1[check_key]);
    const keys2 = Object.keys(json2[check_key]);

    for (const key of keys2) {
        if (!keys1.includes(key)) {
            json1[check_key][key] = json2[check_key][key]; // 补全缺少的 key
        }
    }

    return json1;
}

class Settings {
    static getSettings() {
        try {
            const data = fs.readFileSync(settingsPath, "utf-8");
            const config = JSON.parse(data);
            return config;
        } catch (error) {
            console.log(error);
            return {};
        }
    }

    static setSettings() {
        try {
            const new_config = content;
            fs.writeFileSync(settingsPath, new_config, "utf-8");
        } catch (error) {
            LogError(error);
        }
    }
}

//初始化IpcMain
class IpcAPI {
    getIpcName(name) {
        return `LiteLoader.${slug}.${name}`;
    }

    exportHandle() {
        //获取配置
        ipcMain.handle(
            this.getIpcName("getSettings"),
            (event, message) => {
                return Settings.getSettings();
            }
        );

        //写入配置
        ipcMain.handle(
            this.getIpcName("setSettings"),
            (event, content) => {
                Settings.setSettings(content);
            }
        );
    }
}

//初始化
function onLoad() {
    const defaultSettings = {
        "setting": {
            ws_key: "",
            address: "",
            port: "",
            activeServer: false
        }
    }
    // 设置文件判断
    if (!fs.existsSync(pluginDataPath)) {
        fs.mkdirSync(pluginDataPath, {
            recursive: true
        });
    }
    if (!fs.existsSync(settingsPath)) {
        fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 4));
    } else {
        const data = fs.readFileSync(settingsPath, "utf-8");
        const config = checkAndCompleteKeys(JSON.parse(data), defaultSettings, "setting");
        fs.writeFileSync(settingsPath, JSON.stringify(config, null, 4), "utf-8");
    }
    new IpcAPI().exportHandle()
}


//初始化Adapt基本配置
onLoad()



// 创建窗口时触发
module.exports.onBrowserWindowCreated = window => {
    const setting_data = Settings.getSettings()
    if(setting_data.setting.activeServer){
        const WSServer = new WebsocketServer(setting_data.setting.port)
    }
}