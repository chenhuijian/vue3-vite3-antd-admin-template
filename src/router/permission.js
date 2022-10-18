// 权限鉴定守卫
import { getToken } from '@/utils/auth'
export function createPermissionGuard(router) {
  router.beforeEach(async (to, form, next) => {
    if (to.meta.isWhite) {
      // 白名单直接跳过
      next()
    } else {
      if (getToken()) {
        next()
      } else {
        next('/login')
      }

    }
  })
}
