<script>
/**
 * 可自动调整内部元素宽度的头像
 * [参考antd-v avatar](https://github.com/vueComponent/ant-design-vue/blob/1.x/components/avatar/Avatar.jsx)
 */

import {Icon} from 'vant'

export default {
  name: 'Avatar',

  props: {
    square: Boolean,
    src: String,
    icon: String,
    loadError: Function
  },

  data() {
    return {
      isImgExist: true,
      scale: 1
    }
  },

  computed: {
    elClass() {
      return {
        'avatar': true,
        'avatar-square': this.square,
        'avatar-image': this.src && this.isImgExist,
        'avatar-icon': this.icon
      }
    },
    childrenStyle() {
      const transformString = `scale(${this.scale}) translateX(-50%)`
      return {
        msTransform: transformString,
        WebkitTransform: transformString,
        transform: transformString
      }
    }
  },

  watch: {
    src() {
      this.$nextTick(() => {
        this.isImgExist = true
        this.scale = 1
        // force uodate for position
        this.$forceUpdate()
      })
    }
  },

  methods: {
    setScale() {
      if (!this.$refs.children || !this.$el) {
        return
      }
      const childrenWidth = this.$refs.children.offsetWidth // offsetWidth avoid affecting be transform scale
      const nodeWidth = this.$el.offsetWidth
      // denominator is 0 is no meaning
      if (
          childrenWidth === 0 ||
          nodeWidth === 0 ||
          (this.lastChildrenWidth === childrenWidth && this.lastNodeWidth === nodeWidth)
      ) {
        return
      }
      this.lastChildrenWidth = childrenWidth
      this.lastNodeWidth = nodeWidth
      // add 4px gap for each side to get better performance
      this.scale = nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1
    },
    handleImgLoadError() {
      const {loadError} = this.$props
      const errorFlag = loadError ? loadError() : undefined
      if (errorFlag !== false) {
        this.isImgExist = false
      }
    }
  },

  mounted() {
    this.$nextTick(this.setScale)
  },

  updated() {
    this.$nextTick(this.setScale)
  },

  render() {
    let children

    if (this.src && this.isImgExist) {
      children = <img src={this.src} on-error={this.handleImgLoadError}/>
    }
    else if (this.icon) {
      children = <Icon name={this.icon}/>
    }
    else {
      children = (
          <span class="avatar-string" ref="children" style={this.childrenStyle}>
            {this.$slots.default}
          </span>
      )
    }

    return (
        <span class={this.elClass} {...{on: this.$vnode.componentOptions.listeners}}>
          {children}
        </span>
    )
  }
}
</script>
