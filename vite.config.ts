import {defineConfig} from "vitest/config";
import solid from 'vite-plugin-solid'

export default defineConfig({
  base: process.env.BASE_URL,
  plugins: [solid()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
