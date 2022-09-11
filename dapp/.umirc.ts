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
});
