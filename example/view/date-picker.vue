<template>
  <div>
    <nav-bar title="DatePicker"/>

    <h2 class="demo-desc">选择年月日</h2>
    <van-cell title="选择日期" :value="value" is-link @click="open(1)"/>
    <date-picker ref="picker1" v-model="value" title="选择年月日"/>

    <h2 class="demo-desc">选择年月</h2>
    <van-cell title="选择日期" :value="value" is-link @click="open(2)"/>
    <date-picker ref="picker2" v-model="value" title="选择年月" type="year-month"/>

    <h2 class="demo-desc">选择月日</h2>
    <van-cell title="选择日期" :value="value" is-link @click="open(3)"/>
    <date-picker ref="picker3" v-model="value" title="选择月日" type="month-day"/>

    <h2 class="demo-desc">选择时间</h2>
    <van-cell title="选择日期" :value="value" is-link @click="open(4)"/>
    <date-picker ref="picker4" v-model="value" title="选择时间" type="time"/>

    <h2 class="demo-desc">选择年月日小时</h2>
    <van-cell title="选择日期" :value="value" is-link @click="open(5)"/>
    <date-picker ref="picker5" v-model="value" title="选择年月日小时" type="datehour"/>

    <h2 class="demo-desc">选择完整时间</h2>
    <van-cell title="选择日期" :value="value" is-link @click="open(6)"/>
    <date-picker ref="picker6" v-model="value" title="选择完整时间" type="datetime"/>
  </div>
</template>

<script>

import {Cell} from 'vant'
import DatePicker from '@/DatePicker'

export default {
  name: 'date-picker-demo',

  components: {
    [Cell.name]: Cell,
    DatePicker
  },

  data() {
    return {
      now: new Date(),
      value: null
    }
  },

  methods: {
    open(num) {
      this.$refs[`picker${num}`].show = true
    }
  }
}
</script>
