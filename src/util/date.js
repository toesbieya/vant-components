import {isEmpty} from './index'
import {isIOS} from './device'

/**
 * 日期字符串转Date类型，考虑ios
 *
 * @param str {string}
 * @return {null|Date}
 */
export function parseDateStr(str) {
  if (isEmpty(str)) return null
  if (isIOS) str = str.replace(/-/g, '/')
  return new Date(str)
}

/**
 * 日期格式化
 *
 * @param fmt {*|string}  格式，y(+..y)-年、M(+M)-月、d(+d)-天、H(+H)-时、m(+m)-分、s(+s)-秒、S-毫秒
 * @param date {Date}     可选，被格式化的日期
 * @return {string}       格式化后的日期字符串
 */
export function timeFormat(fmt, date = new Date()) {
  if (isEmpty(fmt)) fmt = 'yyyy-MM-dd HH:mm:ss'

  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'S': date.getMilliseconds() //毫秒
  }

  if (/(y+)/.test(fmt)) {
    const replace = (date.getFullYear() + '').substring(4 - RegExp.$1.length)
    fmt = fmt.replace(RegExp.$1, [...replace].join(''))
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const firstMatch = RegExp.$1
      const replace = firstMatch.length === 1 ? o[k] + '' : ('00' + o[k]).substring(('' + o[k]).length)
      fmt = fmt.replace(firstMatch, [...replace].join(''))
    }
  }

  return fmt
}
