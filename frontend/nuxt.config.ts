export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  typescript: {
    strict: false,
    typeCheck: false,
    shim: false
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api'
    }
  },

  app: {
    head: {
      title: 'Notas - Sistema de Gestión',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistema moderno de gestión de notas' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/tailwind.css'],

  nitro: {
    preset: 'vercel'
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },
  
  compatibilityDate: '2025-01-01'
})