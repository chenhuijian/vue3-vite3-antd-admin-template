<template>
  <a-config-provider v-bind="config">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const config = {
  locale: zhCN,
  input: { autocomplete: 'off' },
  transformCellText: ({ text }) => {
    const type = Object.prototype.toString.call(text)
    if (type === '[object Null]' || type === '[object Undefined]' || (type === '[object Array]' && !text.length)) {
      return '---'
    }
    return text
  }
}
</script>
