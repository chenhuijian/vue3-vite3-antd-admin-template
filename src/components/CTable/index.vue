<template>
  <a-table bordered v-bind="getBindValues" @change="loadData">
    <template v-for="item in renderSlotsArr" #[item]="scope">
      <slot :name="item" v-bind="scope"></slot>
    </template>
  </a-table>
</template>

<script setup>
import { reactive, useSlots, useAttrs, computed, watch, onMounted } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  columns: {
    type: Array,
    required: true
  },
  loadData: {
    type: Function,
    required: true
  },
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  showSizeChanger: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'default'
  },
  rowSelection: {
    type: Object,
    default: null
  },
  showPagination: {
    type: [String, Boolean],
    default: 'auto'
  },
  scroll: {
    type: Object,
    default: () => ({ x: 'max-content' })
  },
  needFirstLoad: {
    type: Boolean,
    default: true
  }
})
const attrs = useAttrs()
const slots = useSlots()
const renderSlotsArr = Object.keys(slots)
const state = reactive({
  localLoading: true,
  localDataSource: [],
  localPagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
})

/**
 * 表格重新加载方法
 * 如果参数为 true, 则强制刷新到第一页
 * @param bool
 */
const refresh = (bool = false) => {
  bool && (state.localPagination = Object.assign({}, {
    current: 1,
    pageSize: props.pageSize,
    total: 0,
    showSizeChanger: props.showSizeChanger
  }))
  loadData()
}

/**
 * 加载数据方法 必须为 Promise 对象
 * @param pagination
 */
const loadData = (pagination, filters, sorter) => {
  state.localLoading = true

  const parameter = Object.assign({
    pageNum: (pagination && pagination.current) ||
      props.showPagination && state.localPagination.current || props.pageNum,
    pageSize: (pagination && pagination.pageSize) ||
      props.showPagination && state.localPagination.pageSize || props.pageSize,
    sorter
  })

  const result = props.loadData(parameter)

  if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
    result.then(res => {
      if (res.status === 0) {
        state.localPagination = props.showPagination && Object.assign({}, state.localPagination, {
          current: res.data.pageNum, // 返回结果中的当前分页数
          total: res.data.total, // 返回结果中的总记录数
          pageSize: (pagination && pagination.pageSize) || state.localPagination.pageSize,
          showSizeChanger: props.showSizeChanger
        }) || false
        // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
        if (res.data.list.length === 0 && props.showPagination && state.localPagination.current > 1) {
          state.localPagination.current--
          loadData()
          return
        }

        state.localDataSource = res.data.list // 返回结果中的数组数据
      } else {
        message.error(res.msg)
      }
      state.localLoading = false
    })
  }
}

const getBindValues = computed(() => {
  return {
    ...props,
    ...attrs,
    dataSource: state.localDataSource,
    loading: state.localLoading,
    pagination: {
      showTotal: (total) => `共 ${total} 条`,
      ...state.localPagination
    }
  }
})

watch(() => props.pageNum, (val) => {
  Object.assign(state.localPagination, {
    current: val
  })
})

watch(() => props.pageSize, (val) => {
  Object.assign(state.localPagination, {
    pageSize: val
  })
})

watch(() => props.showSizeChanger, (val) => {
  Object.assign(state.localPagination, {
    showSizeChanger: val
  })
})

onMounted(() => {
  state.localPagination = ['auto', true].includes(props.showPagination) && Object.assign({}, state.localPagination, {
    current: props.pageNum,
    pageSize: props.pageSize,
    showSizeChanger: props.showSizeChanger
  }) || false
  props.needFirstLoad && loadData()
})

defineExpose({
  refresh
})
</script>

<style scoped>
</style>