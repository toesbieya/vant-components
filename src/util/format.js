/**
 * 将数字转换成千分位字符串显示
 *
 * @param number {string|Number}
 * @return {string}
 */
export function numberToMoney(number) {
  number = Number(number)
  return parseFloat(number.toFixed(2)).toLocaleString('zh', {style: 'currency', currency: 'CNY',minimumFractionDigits: 2})
}

/**
 * 数字转大写中文金额
 *
 * @param number {string|Number}
 * @return {string}
 */
export function numberToUppercaseChinese(number) {
  let money = number
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整'
  // 整型完以后的单位
  let cnIntLast = '元'
  let maxNum = 999999999999999.9999 // 最大处理的数字
  let IntegerNum // 金额整数部分
  let DecimalNum // 金额小数部分
  let largeWord = '' // 输出的中文金额字符串
  let parts // 分离金额后用的数组,预定义
  let Symbol = ''// 正负值标记
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    return ''
  }
  if (money === 0) {
    largeWord = cnNums[0] + cnIntLast + cnInteger
    return largeWord
  }
  if (money < 0) {
    money = -money
    Symbol = '负 '
  }
  money = money.toString() // 转换为字符串
  if (!money.includes('.')) {
    IntegerNum = money
    DecimalNum = ''
  }
  else {
    parts = money.split('.')
    IntegerNum = parts[0]
    DecimalNum = parts[1].substr(0, 4)
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0
    let IntLen = IntegerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = IntegerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      }
      else {
        if (zeroCount > 0) {
          largeWord += cnNums[0]
        }
        zeroCount = 0 // 归零
        largeWord += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        largeWord += cnIntUnits[q]
      }
    }
    largeWord += cnIntLast
  }
  if (DecimalNum !== '') { // 小数部分
    let decLen = DecimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = DecimalNum.substr(i, 1)
      if (n !== '0') {
        largeWord += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (largeWord === '') {
    largeWord += cnNums[0] + cnIntLast + cnInteger
  }
  else if (DecimalNum === '') {
    largeWord += cnInteger
  }
  largeWord = Symbol + largeWord
  return largeWord
}
