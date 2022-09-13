import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/home', component: '@/pages/personal' },
    { path: '/about', component: '@/pages/about' },
    { path: '/', component: '@/pages/landing' },
  ],
  fastRefresh: {},
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
  chainWebpack(conf) {
    // ....other config
    conf.module
      .rule('mjs$')
      .test(/\.mjs$/)
      .include
          .add(/node_modules/)
          .end()
      .type('javascript/auto');
  },
});
