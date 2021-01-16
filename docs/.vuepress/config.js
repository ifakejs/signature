const zh = require('./zh')
const en = require('./en')

const config = {
  base: process.env.NODE === 'development' ? '/' : '/signature/',
  port: 7788,
  title: '基于HTML5 Canvas的签名库',
  description: 'Typescript, HTML5, Cnavas Signature. 基于HTML5 Canvas的签名库.',
  locales: {
    '/': {
      lang: 'zh-CN',
      description: '基于HTML5 Canvas的签名库',
    },
    '/en/': {
      lang: 'en-US',
      description: 'A signature library based on HTML5 canvas.'
    }
  },
  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: 'Github', link: 'https://github.com/ifakejs/signature' },
    ],
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        lang: 'zh-CN',
        sidebar: {
          '/zh/': zh
        }
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        lang: 'en-US',
        sidebar: {
          '/en/': en
        }
      }
    }
  }
}

module.exports = config
