import { defineStore } from 'pinia'
import { getToken } from '@/utils/auth.js'

export const useUserStore = defineStore('useUserStore', {
  state() {
    return {
      userInfo: {},
      token: getToken()
    }
  }
})
