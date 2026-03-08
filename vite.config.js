import { defineConfig } from 'vite'
import { ViteMcp } from 'vite-plugin-mcp'

export default defineConfig({
    plugins: [
        ViteMcp()
    ],
});