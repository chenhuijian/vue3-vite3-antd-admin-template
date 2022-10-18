import { useMenusStore } from '@/store/menus'

export function setupDirective (app) {
  app.directive('permission', {
    // 当被绑定的元素插入到 DOM 中时……
    mounted: function (el, bind) {
      const key = bind.value.split(':')[0]
      const value = bind.value.split(':')[1]
      const btnPermissionMap = useMenusStore().btnPermissionMap
      console.log(useMenusStore().btnPermissionMap)
      const permission = btnPermissionMap[key]?.includes(value)
      if (!permission) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
