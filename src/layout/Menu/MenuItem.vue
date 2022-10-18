<template>
  <a-menu-item v-if="!hasChildren" :key="menu.menuUrl">
    <template v-if="menu.menuIcon" #icon>
      <Icon :name="menu.menuIcon"/>
    </template>
    {{ menu.name }}
  </a-menu-item>
  <a-sub-menu v-else :key="menu.menuUrl">
    <template v-if="menu.menuIcon" #icon>
      <Icon :name="menu.menuIcon"/>
    </template>
    <template #title>
      {{ menu.name }}
    </template>
    <MenuItem
        v-for="route of menu.children"
        :key="route.menuUrl"
        :item="route"
    ></MenuItem>
  </a-sub-menu>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '@/components/Icon'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const menu = computed(() => {
  const { item } = props

  // 如果 children 只有一个，则直接显示
  // if (item.children?.length === 1) {
  //   const child = item.children[0]
  //   return child
  // }

  return item
})

const hasChildren = computed(() => menu.value.children?.length > 0)
</script>
