import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Phenix framework',
  description: 'Phenix framework documentation',
  head: [
    ['meta', { name: 'theme-color', content: '#0077b6' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: '/favicon.webp' }]
  ],
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/phenixphp/phenix'
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
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Providers', link: '/guide/providers' },
            { text: 'Routing', link: '/guide/routing' },
            { text: 'Controllers', link: '/guide/controllers' },
            { text: 'Validation', link: '/guide/validation' },
            { text: 'Migrations', link: '/guide/migrations' },
            { text: 'Seeders', link: '/guide/seeders' },
            { text: 'Query builder', link: '/guide/query_builder' },
            { text: 'ORM', link: '/guide/orm' },
            { text: 'Filesystem', link: '/guide/filesystem' },
            { text: 'Crypto', link: '/guide/crypto' },
            { text: 'Tasks', link: '/guide/tasks' },
            { text: 'Queues', link: '/guide/queues' },
            { text: 'Events', link: '/guide/events' },
            { text: 'Views', link: '/guide/views' },
            { text: 'Mailing', link: '/guide/mailing' },
          ]
        }
      ]
    }
  }
})
