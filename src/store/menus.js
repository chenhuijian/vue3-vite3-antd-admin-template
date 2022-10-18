import { defineStore } from 'pinia'

export const useMenusStore = defineStore('useMenusStore', {
  state() {
    return {
      menus: []
    }
  }
})
