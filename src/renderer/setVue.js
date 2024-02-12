const {
    createApp,
    ref,
    reactive,
    watch
} = await import('../cdnjs.cloudflare.com_ajax_libs_vue_3.3.4_vue.esm-browser.prod.min.js');

const slug = "bdsocket";

const setting_data = await bdsocket.getSettings()

async function setSettings(content) {
    await bdsocket.setSettings(JSON.stringify(content))
}

async function setting_vue(node) {
    const setting_data = await bdsocket.getSettings()
    const htmlicon = `<svg t="1707752831180" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4242" data-darkreader-inline-fill="" width="200" height="200"><path d="M896 288v-64c0-70.4-57.6-128-128-128H256c-70.4 0-128 57.6-128 128v64c0 38.4 17.6 72 43.2 96C145.6 408 128 441.6 128 480v64c0 38.4 17.6 72 43.2 96C145.6 664 128 697.6 128 736v64c0 70.4 57.6 128 128 128h512c70.4 0 128-57.6 128-128v-64c0-38.4-17.6-72-43.2-96 27.2-24 43.2-57.6 43.2-96v-64c0-38.4-17.6-72-43.2-96 25.6-24 43.2-57.6 43.2-96z m-64 512c0 35.2-28.8 64-64 64H256c-35.2 0-64-28.8-64-64v-64c0-35.2 28.8-64 64-64h512c35.2 0 64 28.8 64 64v64z m0-256c0 35.2-28.8 64-64 64H256c-35.2 0-64-28.8-64-64v-64c0-35.2 28.8-64 64-64h512c35.2 0 64 28.8 64 64v64z m0-256c0 35.2-28.8 64-64 64H256c-35.2 0-64-28.8-64-64v-64c0-35.2 28.8-64 64-64h512c35.2 0 64 28.8 64 64v64z" fill="#4A576A" p-id="4387" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #3b4655;"></path><path d="M704 256m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#4A576A" p-id="4388" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #afa89e;"></path><path d="M704 512m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#4A576A" p-id="4389" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #afa89e;"></path><path d="M704 768m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" p-id="4390" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #afa89e;"></path></svg>`
    node.querySelector(".q-icon.icon").insertAdjacentHTML('afterbegin', htmlicon)
    node.addEventListener("click", () => {
        if (!document.querySelector("#bdsocket")?.__vue_app__) {
            const app = createApp({
                setup() {
                    const setting_obj = reactive(setting_data.setting)
                    watch(setting_obj, (newValue, oldValue) => {
                        setting_data.setting = newValue
                        setSettings(setting_data)
                    })
                    return setting_obj
                }
            })
            app.mount('#bdsocket')
        }
        if (!document.querySelector("#bdsocket_version")?.__vue_app__) {
            const app = createApp({
                setup() {
                    return {
                        version: LiteLoader.plugins[slug].manifest.version
                    }
                }
            })
            app.mount('#bdsocket_version')
        }
    })
}

export {
    setting_vue
}