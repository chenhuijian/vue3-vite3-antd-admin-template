import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import antdFullImportPlugin from './src/plugins/antdFullImportPlugin'

const target = 'http://127.0.0.1'
const urlPrefix = ['/user']
const proxy = {}
urlPrefix.map(key => {
  proxy[key] = {
    target,
    xfwd: false,
    changeOrigin: true
  }
})

const localEnabled = process.env.USE_MOCK === 'true'
const prodEnabled = process.env.USE_PRO_MOCK === 'true'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    mode === 'development'
      ? antdFullImportPlugin()
      : Components({
        resolvers: [AntDesignVueResolver()]
      }),
    viteMockServe({
      mockPath: './src/mock/', // mock 目录
      localEnabled: localEnabled,  // 开发打包开关
      prodEnabled: prodEnabled, // 生产打包开关
      injectCode: `
             // 这个路径需要注意是在你要注入的文件下的引用路径
              import setupProdMockServer from './mock/utils/mockProdServer.js';
              setupProdMockServer();
            `,
      supportTs: false, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
      logger: false,
      watchFiles: true  // 监视文件更改
    })
  ],
  server: {
    port: 9527,
    host: '0.0.0.0',
    proxy
  },
  // esbuild:{
  //   pure: ['console.log', 'debugger'],
  //   supported: {
  //     // https://github.com/vitejs/vite/pull/8665
  //     'top-level-await': true,
  //   },
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     // warnings: false,
    //     drop_console: true,  //打包时删除console
    //     drop_debugger: true, //打包时删除 debugger
    //     pure_funcs: ['console.log']
    //   },
    //   output: {
    //     // 去掉注释内容
    //     comments: true
    //   }
    // }
  },
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
}))
