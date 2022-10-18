<template>
  <a-layout class="layout-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">{{ collapsed ? 'logo' : '管理系统' }}</div>
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header" style="background: #fff; padding: 0;height: auto">
        <div class="header-left pointer" @click="handleToggleCollapsed">
          <Icon
            name="MenuUnfoldOutlined"
            v-if="collapsed"
            class="collapsed"
          />
          <Icon
            name="MenuFoldOutlined"
            v-else
            class="collapsed"
          />
        </div>
        <div class="header-right">
          <a-space>
            <a-avatar
              size="small"
              :src="userInfo.avatar"
              class="avatar"
            />
            <span>{{ userInfo.username }}</span>
            <span @click="handleLogout" class="pointer">退出登录</span>
          </a-space>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon'
import Menu from './Menu'
import { useUserStore } from '@/store/user'
import { removeToken } from '@/utils/auth'
import { getUserInfo } from '@/api/auth'

const userStore = useUserStore()
const router = useRouter()
const { userInfo } = storeToRefs(userStore)
const collapsed = ref(false)

onMounted(async () => {
  const userInfo = await getUserInfo()
  if (userInfo.status === 0) {
    userStore.userInfo = userInfo.data
  }
})


const handleToggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
const handleLogout = () => {
  removeToken()
  router.replace('/login')
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #fff;
}

.logo {
  text-align: center;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: bold;
  margin: 16px;
  white-space: nowrap;
}

.layout-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  height: 100%;
  overflow: auto;
}

.layout-header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  .header-left {
    padding-left: 24px;
  }

  .header-right {
    padding-right: 24px;
  }
}
</style>
