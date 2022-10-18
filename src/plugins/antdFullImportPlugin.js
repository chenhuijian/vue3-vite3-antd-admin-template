import path from 'path'

export default function fullImportPlugin() {
  let config = null
  return {
    name: 'fullImportPlugin',
    async configResolved(conf) {
      config = conf
    },
    transform(code, id) {
      if (path.join(config.root, 'src/main.js') === path.join(id)) {
        const name = 'Antd'
        // 引入 ant-design-vue 和 样式
        const prepend = `import ${name} from 'ant-design-vue'\nimport 'ant-design-vue/dist/antd.css'\n`
        code = code.replace('.mount(', ($1) => `.use(${name})` + $1)
        return prepend + code
      }
      return code
    }
  }
}
