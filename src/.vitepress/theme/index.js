import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import BlogIndex from './components/BlogIndex.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp (ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    const { app } = ctx

    app.component('BlogIndex', BlogIndex)
  }
}
