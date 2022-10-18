import { defineStore } from 'pinia'
import { getMenuList } from '@/api/auth'

export const useMenusStore = defineStore('useMenusStore', {
  state() {
    return {
      menus: [],
      btnPermissionMap: {}
    }
  },
  actions: {
    getMenuList() {
      return new Promise(async resolve => {
        const { status, data } = await getMenuList()
        console.log(status, data)
        const btnMap = {}

        data.map(item => {
          if (item.children?.length > 0) {
            item.children.map((child) => {
              if (child.children?.length > 0) {
                child.children.map((child) => {
                  child.button?.length && (btnMap[child.value] = child.button.map(e => e.value))
                })
              } else {
                if (child.button?.length > 0) {
                  btnMap[child.value] = child.button.map(e => e.value)
                }
              }
            })
          } else {
            if (item.button?.length > 0) {
              btnMap[item.value] = item.button.map(e => e.value)
            }
          }
        })
        console.log(this)
        this.$patch({
          btnPermissionMap: btnMap,
          menus: data
        })

        // this.btnPermissionMap = btnMap
        // this.menus = data
      })
    }
  }
})
