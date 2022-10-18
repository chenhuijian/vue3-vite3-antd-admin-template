import { Modal, message as antMessage } from 'ant-design-vue'
import 'ant-design-vue/lib/message/style/css'
// import 'ant-design-vue/es/message/style/index.less'
// import 'ant-design-vue/es/Modal/style/css';

export function $HHconfirm(options = {}) {
  console.log('options-=',options)
  const {
    title = '提示',
    content = '',
    onOk,
    onCancel,
    destroyOnClose,
    afterClose,
  } = options
  Modal.confirm({
    title,
    content,
    destroyOnClose,
    onOk,
    onCancel,
    afterClose,
    ...options
  })
}

export const message = antMessage

