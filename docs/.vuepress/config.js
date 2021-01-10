const path = require('path')
const zh = require('./zh')
const en = require('./en')

const config = {
  base: process.env.NODE === 'development' ? '/' : '/signature/',
  port: 7788,
  title: 'Signature',
  description: '一款支持web和移动端的手写签名库',
  locales: {
    '/': {
      lang: 'zh-CN',
      description: '一款支持web和移动端的手写签名库',
    },
    '/en/': {
      lang: 'en-US',
      description: 'A signature library for Web & Mobile.'
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