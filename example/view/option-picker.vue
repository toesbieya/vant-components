<template>
  <div>
    <nav-bar title="OptionPicker"/>

    <h2 class="demo-desc">单选</h2>
    <van-cell title="商品" :value="cellValue1" is-link @click="open(1)"/>
    <option-picker ref="picker1" v-model="value1" :options="options"/>

    <h2 class="demo-desc">确认操作栏</h2>
    <van-cell title="商品" :value="cellValue1" is-link @click="open(2)"/>
    <option-picker ref="picker2" v-model="value1" :options="options" title="选择商品" show-toolbar/>

    <h2 class="demo-desc">多选</h2>
    <van-cell title="商品" :value="cellValue3" is-link @click="open(3)"/>
    <option-picker ref="picker3" v-model="value3" :options="options" title="选择商品" show-toolbar multiple/>

    <h2 class="demo-desc">无数据时的空状态</h2>
    <van-cell title="商品" is-link @click="open(4)"/>
    <option-picker ref="picker4"/>

    <h2 class="demo-desc">分页搜索</h2>
    <van-cell title="商品" :value="cellValue5()" is-link @click="open(5)"/>
    <option-picker ref="picker5" v-model="value1" show-toolbar searchable placeholder="输入商品名称" :api="api"/>

    <h2 class="demo-desc">取消按钮</h2>
    <van-cell title="商品" :value="cellValue1" is-link @click="open(6)"/>
    <option-picker ref="picker6" v-model="value1" :options="options" cancelable/>
  </div>
</template>

<script>
import {Cell} from 'vant'
import OptionPicker from '@/OptionPicker'

let seed = 0

export default {
  name: 'option-picker-demo',

  components: {
    [Cell.name]: Cell,
    OptionPicker
  },

  data() {
    return {
      options: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ],
      value1: null,
      value3: []
    }
  },

  computed: {
    cellValue1() {
      const option = this.options.find(i => i.value === this.value1)
      return option && option.text
    },
    cellValue3() {
      return this.options
          .filter(i => this.value3.includes(i.value))
          .map(i => i.text)
          .join(',')
    }
  },

  methods: {
    open(num) {
      this.$refs[`picker${num}`].show = true
    },
    api() {
      const finished = this.$refs.picker5.list.length >= 20
      const list = Array(10).fill(1).map(() => ({text: `商品${seed}`, value: seed++}))
      return new Promise(resolve => {
        setTimeout(() => resolve({list, finished}), 1000)
      })
    },
    cellValue5() {
      const picker = this.$refs.picker5
      const option = picker && picker.list.find(i => i.value === this.value1)
      return option && option.text
    }
  }
}
</script>
