import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({ importMode: 'async' }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', 'vue-i18n'],
      dts: 'src/auto-import.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [
        // auto import icons
        // https://github.com/antfu/vite-plugin-icons
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/vite-plugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: false,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
})
