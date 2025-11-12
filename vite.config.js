import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/<your-vue-repo-name>/' // TODO: replace with your repo name
})
