import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/landing' },
    { path: '/home', component: '@/pages/personal' },
  ],
  fastRefresh: {},
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
});
