<template>
  <div>
    <nav-bar title="PickerField"/>

    <h2 class="demo-desc">选项选择器</h2>
    <picker-field v-model="value1" :options="options" label="商品" placeholder="选择商品" show-toolbar/>

    <h2 class="demo-desc">日期选择器</h2>
    <picker-field v-model="value2" label="日期" type="date" placeholder="选择日期"/>
  </div>
</template>

<script>
import {Cell} from 'vant'
import PickerField from '@/PickerField'

export default {
  name: 'picker-field-demo',

  components: {
    [Cell.name]: Cell,
    PickerField
  },

  data() {
    return {
      value1: null,
      value2: null,
      options: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ]
    }
  },

  methods: {}
}
</script>
