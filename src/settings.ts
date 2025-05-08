import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'
import { cloneDeep } from 'es-toolkit'

const globalSettings: Settings.all = {
  // 请在此处编写或粘贴配置代码

    "menu": {
      "enableSubMenuCollapseButton": true
    },
    "tabbar": {
      "enable": true
    },
    "toolbar": {
      "fullscreen": true,
      "pageReload": true
    }

}

export default merge(globalSettings, cloneDeep(settingsDefault)) as RecursiveRequired<Settings.all>
