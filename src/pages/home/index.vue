<template>
  <a-form
    ref="formRef"
    :model="formState"
  >
    <a-row :gutter="24" :wrap="true">
      <a-col :xxl="4" :xl="6" :lg='6' :md='8' :sm='24'>
        <a-form-item label="企业简称：" name="shortName">
          <a-input v-model:value.trim="formState.shortName" placeholder="请输入企业简称" :maxlength="100"/>
        </a-form-item>
      </a-col>
      <a-col :xxl="4" :xl="6" :lg='6' :md='8' :sm='24'>
        <a-form-item label="到期状态：" name="expirationStatus">
          <a-select
            v-model:value="formState.expirationStatus"
            :options="[
                {label: '全部',value:''},
                {label: '即将到期',value:0},
                {label: '服务中',value:1},
                {label: '已到期',value:2},
              ]"
          />
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item label="到期日期：" name="serviceTime">
          <a-range-picker
            style="width: 100%;text-align: center"
            value-format="YYYY-MM-DD"
            v-model:value="formState.serviceTime"
          />
        </a-form-item>
      </a-col>
      <a-col :xxl="4" :xl="6" :lg='6' :md='8' :sm='24'>
        <a-form-item label="签约状态：" name="signingStatus">
          <a-select
            v-model:value="formState.signingStatus"
            :options="[
                {label: '全部',value:''},
                {label: '未签约',value:0},
                {label: '已签约',value:1},
              ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xxl="4" :xl="6" :lg='6' :md='8' :sm='24'>
        <a-form-item label="企业用途：" name="enterpriseUse">
          <a-select
            v-model:value="formState.enterpriseUse"
            :options="[
                {label: '全部',value:''},
                {label: '自用型',value:0},
                {label: '服务型',value:1},
              ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xxl="4" :xl="6" :lg='6' :md='8' :sm='24'>
        <a-form-item label="项目控制：" name="controlProject">
          <a-select
            v-model:value="formState.controlProject"
            :options="[
                {label: '全部',value:''},
                {label: '控制',value:0},
                {label: '不控制',value:1},
              ]"
          />
        </a-form-item>
      </a-col>
      <a-col :xxl="4" :xl="6" :lg='6' :md='8' :sm='24'>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="() => cTableRef.refresh(true)">查询</a-button>
            <a-button @click="() => formRef.resetFields()">重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>


  <c-table
    ref="cTableRef"
    :load-data="loadData"
    :columns="columns"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'shortName'">
        <a-typography-text
          :style="{ width: '150px' }"
          :ellipsis="{ tooltip: record.shortName || '---' }"
          :content="record.shortName || '---'"
        />
      </template>
      <template v-if="column.key === 'fullName'">
        <a-typography-text
          :style="{ width: '150px' }"
          :ellipsis="{ tooltip: record.fullName || '---' }"
          :content="record.fullName || '---'"
        />
      </template>
      <template v-if="column.key === 'name'">
        <a-typography-text
          :style="{ width: '150px' }"
          :ellipsis="{ tooltip: record.name || '---' }"
          :content="record.name || '---'"
        />
      </template>
      <template v-if="column.key === 'phoneNumber'">
        <a-typography-text
          :style="{ width: '150px' }"
          :ellipsis="{ tooltip: record.phoneNumber || '---' }"
          :content="record.phoneNumber || '---'"
        />
      </template>
      <template v-if="column.key === 'action'">
        <a-button type="link">企业管理</a-button>
        <a-divider type="vertical"/>
        <a-button type="link">统计</a-button>
      </template>
    </template>

  </c-table>
</template>

<script setup>
import { ref, reactive } from 'vue'
import CTable from '@/components/CTable'
import { getEnterpriseList } from './api'

const cTableRef = ref()
const formRef = ref()
const formState = reactive({
  shortName: '',
  expirationStatus: '',
  serviceTime: null,
  signingStatus: '',
  enterpriseUse: '',
  controlProject: ''
})

const columns = [
  {
    title: '企业简称',
    dataIndex: 'shortName',
    key: 'shortName'
  },
  {
    title: '企业全称',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: '签约状态',
    dataIndex: 'signingStatus',
    key: 'signingStatus',
    customRender: ({ text }) => text === 0 ? '未签约' : text === 1 ? '已签约' : '---'
  },
  {
    title: '服务到期时间',
    dataIndex: 'serviceTime',
    key: 'serviceTime'
  },
  {
    title: '到期状态',
    dataIndex: 'expireStatus',
    key: 'expireStatus',
    customRender: ({ text }) => text === 0 ? '即将到期' : text === 1 ? '服务中' : text === 2 ? '已到期' : '---'
  },
  {
    title: '企业用途',
    dataIndex: 'enterpriseUse',
    key: 'enterpriseUse',
    customRender: ({ text }) => text === 0 ? '自用型' : text === 1 ? '服务型' : '---'
  },
  {
    title: '是否控制项目',
    dataIndex: 'controlProject',
    key: 'controlProject',
    customRender: ({ text }) => text === 0 ? '控制' : text === 1 ? '不控制' : '---'
  },
  {
    title: '企业联系人',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '企业联系人方式',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    fixed: 'right'
  }
]
const loadData = (parameter) => {
  const { shortName, expirationStatus, serviceTime, signingStatus, enterpriseUse, controlProject } = formState
  const params = {
    shortName,
    expirationStatus,
    beginTime: serviceTime?.[0],
    endTime: serviceTime?.[1],
    signingStatus,
    enterpriseUse,
    controlProject
  }
  const { pageNum, pageSize: pageSize } = parameter
  const requestParameters = Object.assign({}, { pageNum, pageSize }, params)
  console.log('requestParameters===>', requestParameters)
  return getEnterpriseList(requestParameters)
}
</script>

<style lang="scss" scoped>

</style>
