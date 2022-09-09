module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx,js,jsx}'],
  darkMode: false,
  theme: {
    fontSize: {
    },
    extend: {
      spacing: {
        // 内容区域宽度
        main: '1296px',
      },
      colors: {
        // 浅绿色渐变 - 炫彩2 - 起始
        'xc2-a': '#79D5A8',
        'xc2-a/40': 'rgba(121, 213, 168, 0.4)',
        // 浅绿色渐变 - 炫彩2 - 结束
        'xc2-b': '#D5F97D',
        'xc2-b/40': 'rgba(213, 249, 125, 0.4)',
        // 浅绿色渐变 - 炫彩（白） - 起始
        'xcb-a': '#53C78E',
        // 浅绿色渐变 - 炫彩（白） - 结束
        'xcb-b': '#9CCB28',
      },
      fontFamily: {
        IBMPlexMono: ['IBM Plex Mono'],
        IBMPlexMonoBold: ['IBM Plex Mono Bold'],
        Audiowide: ['Audiowide'],
        Inter: ['Inter'],
      },
      scale: {
        // 12px * 0.83 = 10px
        xs: '.83',
      },
    },
  },
  variants: {},
  plugins: [],
};
