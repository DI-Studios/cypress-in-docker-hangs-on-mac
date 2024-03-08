import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://google.com',
    supportFile: false,
    video: false,
  },
})