<template>
  <div class="fab" :class="show && 'show'">
    <div class="fab-trigger" @click="switchShow">
      <van-icon name="plus"/>
    </div>

    <div class="fab-content" :class="direction">
      <slot/>
    </div>
  </div>
</template>

<script>
import {Icon} from 'vant'

export default {
  name: 'Fab',

  provide() {
    return {
      Fab: this
    }
  },

  components: {
    [Icon.name]: Icon
  },

  props: {
    // 打开的方向，'up' | 'down'
    direction: {type: String, default: 'up'},
    // 是否显示提示文字
    showLabel: {type: Boolean, default: true},
    // 提示文字位置，'left' | 'right'
    labelPosition: {type: String, default: 'left'},
    // 是否在点击打开的按钮后关闭
    closeOnClick: {type: Boolean, default: true}
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    switchShow() {
      this.show = !this.show
    }
  }
}
</script>
