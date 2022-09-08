import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/personal' },
  ],
  fastRefresh: {},
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
});
