<template>
  <div class="login-container">
    <a-form
      class="login-box"
      :model="state.formInline"
      :label-col="{ span: 5 }"
      @finish="onFinish"
    >
      <h3 class="login-title">管理系统登录</h3>
      <a-form-item
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >

        <a-input v-model:value.trim="state.formInline.username" placeholder="用户名">
          <template #prefix>
            <Icon name="UserOutlined"/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value.trim="state.formInline.password" placeholder="密码">
          <template #prefix>
            <Icon name="LockOutlined"/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        name="checkCode"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <div style="display: flex">
          <a-input v-model:value.trim="state.formInline.checkCode" autocomplete="off" placeholder="验证码"/>
          <!--          <img class="check-code" src="@/assets/code.png" alt="" style="margin-left: 20px;">-->
          <img class="check-code" @click="handleGetCheckCode" :src="state.checkCodeUrl" alt="" style="margin-left: 20px;cursor: pointer">
        </div>
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button block type="primary" html-type="submit" :loading="state.loginLoading">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon'
import { message } from '@/plugins/antd'
import { setToken, removeToken } from '@/utils/auth'
import { login, getCode, getUserInfo } from '@/api/auth.js'
import { useUserStore } from '@/store/user.js'

const userStore = useUserStore()

console.log('userStore===>', userStore)
const router = useRouter()
const state = reactive({
  loginLoading: false,
  formInline: {
    username: 'admin',
    password: '123456',
    checkCode: '1234'
  },
  checkCodeUrl: ''

})
onMounted(() => {
  removeToken()
  handleGetCheckCode()
})
const handleGetCheckCode = async () => {
  const res = await getCode()
  state.checkCodeUrl = res.data
}
const onFinish = async (values) => {
  state.loginLoading = true

  const loginInfo = await login(values)
  if (loginInfo.status !== 0) {
    state.loginLoading = false
    message.error(loginInfo.msg)
    return
  }
  setToken(loginInfo.data.token)
  router.replace('/home')
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  /*background-color: $bg;*/
  overflow: hidden;
}

.login-box {
  border: 1px solid #DCDFE6;
  width: 380px;
  margin: 180px auto;
  padding: 20px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
  font-weight: bold;
  font-size: 20px;
}

.check-code {
  width: 120px;
}
</style>
