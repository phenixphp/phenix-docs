import { defineConfig } from 'vitepress'
import { createHighlighter } from 'shiki'

const codeTheme = {
  light: 'github-light',
  dark: 'github-dark'
}

let highlighterPromise

function getHighlighter () {
  highlighterPromise ??= createHighlighter({
    themes: [codeTheme.light, codeTheme.dark],
    langs: ['php']
  })

  return highlighterPromise
}

export default defineConfig({
  title: 'PhenixPHP',
  description: 'PhenixPHP framework documentation',
  appearance: 'dark',
  async transformPageData (pageData) {
    const showcase = pageData.frontmatter.codeShowcase

    if (!showcase?.tabs?.length) {
      return
    }

    const highlighter = await getHighlighter()

    return {
      frontmatter: {
        ...pageData.frontmatter,
        codeShowcase: {
          ...showcase,
          tabs: showcase.tabs.map((tab) => ({
            ...tab,
            highlightedCode: highlighter.codeToHtml(tab.code, {
              lang: 'php',
              themes: codeTheme,
              defaultColor: false
            })
          }))
        }
      }
    }
  },
  markdown: {
    theme: codeTheme,
    lineNumbers: true,
    languageLabel: {
      php: 'PHP'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0077b6' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: '/favicon.webp' }]
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/phenixphp/phenix'
      },
      {
        text: 'X/Twitter',
        link: 'https://x.com/phenixphp'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Getting started', link: '/guide/getting_started' },
            { text: 'Hot reloading', link: '/guide/hot_reloading' },
            { text: 'Server', link: '/guide/server' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Providers', link: '/guide/providers' },
            { text: 'Routing', link: '/guide/routing' },
            { text: 'Controllers', link: '/guide/controllers' },
            { text: 'Middlewares', link: '/guide/middlewares' },
            { text: 'Validation', link: '/guide/validation' },
            { text: 'Migrations', link: '/guide/migrations' },
            { text: 'Seeders', link: '/guide/seeders' },
            { text: 'Query builder', link: '/guide/query_builder' },
            { text: 'ORM', link: '/guide/orm' },
            { text: 'Filesystem', link: '/guide/filesystem' },
            { text: 'Caching', link: '/guide/caching' },
            { text: 'Logging', link: '/guide/logging' },
            { text: 'Crypto', link: '/guide/crypto' },
            { text: 'Scheduling', link: '/guide/scheduling' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'Sessions', link: '/guide/sessions' },
            { text: 'Tasks', link: '/guide/tasks' },
            { text: 'Queues', link: '/guide/queues' },
            { text: 'Events', link: '/guide/events' },
            { text: 'Views', link: '/guide/views' },
            { text: 'Translation', link: '/guide/translation' },
            { text: 'Mailing', link: '/guide/mailing' },
            { text: 'Helpers', link: '/guide/helpers' },
            { text: 'Testing', link: '/guide/testing' },
            { text: 'Deployment', link: '/guide/deployment' },
          ]
        }
      ]
    }
  }
})
