<template>
  <div>
    <!--  用于输入的输入框  -->
    <van-field
        ref="field"
        :label="label"
        :value="isFocused ? value : formattedValue"
        :type="isFocused ? 'number' : 'text'"
        :readonly="readonly"
        :placeholder="placeholder"
        :required="required"
        :rules="rules"
        :input-align="inputAlign"
        :maxlength="maxlength"
        :formatter="fieldFormatter"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
    />

    <!--  用于展示大写金额的文本框  -->
    <van-field v-if="showCapital" label="大写" :value="uppercaseChinese" readonly :input-align="inputAlign"/>

    <!--  避免不显示下边框  -->
    <div class="van-cell" style="display: none"/>
  </div>
</template>

<script>
import {Field} from 'vant'
import {isEmpty} from '../util'
import {numberToMoney, numberToUppercaseChinese} from '../util/format'

export default {
  name: 'AmountInput',

  components: {
    [Field.name]: Field
  },

  props: {
    value: [String, Number],
    label: String,
    readonly: Boolean,
    placeholder: String,
    required: Boolean,
    rules: Array,
    inputAlign: String,
    maxlength: {type: Number, default: 15},
    // 小数点位数最多几位，为0时不限制
    decimalLength: {type: Number, default: 2},
    // 是否显示下方的大写文本框
    showCapital: Boolean
  },

  data() {
    return {
      // 输入框是否聚焦
      isFocused: false
    }
  },

  computed: {
    // 格式化金额
    formattedValue() {
      return isEmpty(this.value) ? '' : numberToMoney(this.value)
    },
    // 大写金额
    uppercaseChinese() {
      return isEmpty(this.value) ? '' : numberToUppercaseChinese(this.value)
    }
  },

  methods: {
    onInput(v) {
      this.isFocused && this.$emit('input', v)
    },
    onFocus() {
      this.isFocused = true
    },
    onBlur() {
      this.isFocused = false
    },
    // 在输入时限制小数点位数
    fieldFormatter(v) {
      if (isEmpty(v) || !this.decimalLength) return v

      const i = v.indexOf('.')
      if (i === -1) return v

      if (i !== -1 && v.length - 1 - i >= this.decimalLength) {
        const pair = v.split('.')
        return `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`
      }

      return v
    }
  }
}
</script>
