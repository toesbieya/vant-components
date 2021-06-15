<template>
  <div class="fab-item" :class="color" @click="onClick">
    <slot>
      <van-icon :name="icon"/>
    </slot>

    <div class="fab-item__label" :class="_labelPosition" v-if="_showLabel">{{ label }}</div>
  </div>
</template>

<script>
import {Icon} from 'vant'
import {isEmpty} from '@/util'

export default {
  name: 'FabItem',

  inject: {
    Fab: {
      default() {
        return {
          switchShow: () => void 0
        }
      }
    }
  },

  components: {
    [Icon.name]: Icon
  },

  props: {
    // 按钮icon名称，传递给van-icon的name属性
    icon: String,
    // 提示文字，为空时不会渲染提示文字
    label: String,
    // 按钮背景色，'blue' | 'red' | 'orange'
    color: {type: String, default: 'blue'},
    // 是否显示提示文字，优先使用
    showLabel: {type: Boolean, default: undefined},
    // 提示文字位置，'left' | 'right'，优先使用
    labelPosition: String,
    // 是否在点击后关闭，优先使用
    closeOnClick: {type: Boolean, default: undefined}
  },

  computed: {
    _showLabel() {
      return isEmpty(this.label)
          ? false
          : isEmpty(this.showLabel)
              ? this.Fab.showLabel
              : this.showLabel
    },
    _labelPosition() {
      return isEmpty(this.labelPosition) ? this.Fab.labelPosition : this.labelPosition
    },
    _closeOnClick() {
      return isEmpty(this.closeOnClick) ? this.Fab.closeOnClick : this.closeOnClick
    }
  },

  methods: {
    onClick() {
      const closeOnClick = this._closeOnClick

      closeOnClick && this.Fab.switchShow()
      this.$emit('click', closeOnClick ? undefined : this.Fab.switchShow)
    }
  }
}
</script>
