// 默认字体size 选项
import { realPx } from './utils'
export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

// 默认字体family选项
export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

// 主题设置
export function themeList(vue) {
  // 设置alias别名,以适用国际化
  // name 为实际方法调用的名称
  // style 为对应样式文件,json形式
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    }
  ]
}
