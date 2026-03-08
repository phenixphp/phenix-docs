export default {
  title: 'Phenix framework',
  description: 'Phenix framework documentation',
  head: [
    ['meta', { name: 'theme-color', content: '#0077b6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
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
            { text: 'Filesystem', link: '/guide/filesystem' }
          ]
        }
      ]
    }
  }
}
