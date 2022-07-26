import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [vue(), Components({
    resolvers: [
      AntDesignVueResolver() // antd按需加载
    ]
  })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    port: 8080,
    open: true
  },
  define: {
    'process.env': process.env
  }
})

