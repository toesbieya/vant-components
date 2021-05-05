<template>
  <van-popup
      v-model="show"
      class="date-picker"
      :get-container="getContainer"
      position="bottom"
      round
      :duration="0.2"
  >
    <van-datetime-picker
        v-model="innerValue"
        :type="type"
        :title="title"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="close"
        @confirm="onPickerConfirm"
    />
  </van-popup>
</template>

<script>
import {Popup, DatetimePicker} from 'vant'
import {parseDateStr, timeFormat} from '../util/date'

export default {
  name: 'DatePicker',

  model: {
    prop: 'value',
    event: 'change'
  },

  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  },

  props: {
    value: String,

    /*van-datetime-picker原有属性*/
    type: {type: String, default: 'date'},
    title: String,
    minDate: Date,
    maxDate: Date
  },

  data(vm) {
    return {
      // 弹出层的显隐
      show: false,
      // 内部维护的值，Date类型，当props.value变化时会跟着变化
      innerValue: parseDateStr(vm.value)
    }
  },

  computed: {
    // 根据props.type获取日期的格式化字符串
    formatter() {
      switch (this.type) {
        case 'date':
          return 'yyyy-MM-dd'
        case 'datehour':
          return 'yyyy-MM-dd HH'
        case 'datetime':
          return 'yyyy-MM-dd HH:mm:ss'
        case 'time':
          return 'HH:mm:ss'
        case 'year-month':
          return 'yyyy-MM'
        case 'month-day':
          return 'MM-dd'
      }
    }
  },

  watch: {
    value: 'updateInnerValue'
  },

  methods: {
    getContainer() {
      return document.body
    },
    close() {
      this.show = false
    },
    // 弹出层关闭后需要将data.innerValue重置为props.value
    onPopupClosed() {
      this.updateInnerValue(this.value)
    },
    onPickerConfirm(v) {
      const formatted = timeFormat(this.formatter, v)
      formatted !== this.value && this.$emit('change', formatted)

      this.close()
    },
    updateInnerValue(str) {
      this.innerValue = parseDateStr(str)
    }
  }
}
</script>
