<template>
  <div>
    <!--  用于输入的输入框  -->
    <van-field
        :label="label"
        :value="isFocused ? value : formattedValue"
        :type="isFocused ? 'number' : 'text'"
        :readonly="readonly"
        :placeholder="placeholder"
        :required="required"
        :rules="rules"
        :input-align="inputAlign"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
    />

    <!--  用于展示大写金额的文本框  -->
    <van-field v-if="showCapital" label="大写" :value="uppercaseChinese" readonly :input-align="inputAlign"/>
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
    }
  }
}
</script>
