<template>
  <a-menu
    :selected-keys="activeRoute"
    :openKeys="openKeys"
    mode="inline"
    theme="dark"
    :style="{ height: '100%', borderRight: 0 }"
    @click="handleMenuSelect"
    @openChange="onOpenChange"
  >
    <menu-item
      v-for="menu of menusStore.munes"
      :key="menu.menuUrl"
      :item="menu"
    ></menu-item>
  </a-menu>
</template>

<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isUrl } from '@/utils/is'
import MenuItem from './MenuItem'
import { getMenuList } from '@/api/auth'
import { useMenusStore } from '@/store/menus'

const router = useRouter()
const route = useRoute()
const menusStore = useMenusStore()
onMounted(async () => {
  const { status, data } = await getMenuList()
  if (status === 0) {
    menusStore.munes = data
  }
  console.log(data)
  // if(!store.getters.auth.menus.length){
  // await store.dispatch('auth/menus')
  // await store.dispatch('auth/loginInfo')
  // }
})

const activeRoute = computed(() => route.meta.activeMenu ? [route.meta.activeMenu] : [route.path])

const openKeys = ref(['/' + route.path.split('\/')[1]])

function handleMenuSelect(item) {
  const { key, keyPath } = item
  if (keyPath.length === 1) {
    openKeys.value = []
  }
  if (isUrl(key)) {
    return window.open(key, '_blank')
  }

  router.push(key)
}

const onOpenChange = openArr => {
  openKeys.value = [openArr[openArr.length - 1]]
}
</script>
