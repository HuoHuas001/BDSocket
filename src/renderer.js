const slug = "bdsocket";
const plugin_path = LiteLoader.plugins[slug].path.plugin;

import {
    setting_vue
} from "./renderer/setVue.js"
class Logger {
    //日志输出API
    info(...args) {
        console.log(`[BDSocket][Info]`, ...args)
    }

    warn(...args) {
        console.log(`[BDSocket][Warn]`, ...args)
    }

    error(...args) {
        console.log(`[BDSocket][Error]`, ...args)
    }
}
const logger = new Logger();


async function onSettingWindowCreated(view) {
    logger.info("[Settings] Settings Panel Open.")
    const html_file_path = `local:///${plugin_path}/src/resource/settings.html`;
    const css_file_path = `local:///${plugin_path}/src/resource/view.css`;
    try {
        // 插入设置页
        const htmlText = await (await fetch(html_file_path)).text()
        view.insertAdjacentHTML('afterbegin', htmlText)
        // 插入设置页样式
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = css_file_path
        document.head.appendChild(link)

        document.querySelectorAll(".nav-item.liteloader").forEach(node => {
            if (node.textContent === "BDSocket Adapter") {
                setting_vue(node)
            }
        })

    } catch (e) {
        logger.error("[Settings] Setting Panel Error:", e)
    }

}

export {
    onSettingWindowCreated
}