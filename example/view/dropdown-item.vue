<template>
  <div>
    <nav-bar title="DropdownItem"/>

    <h2 class="demo-desc">加载中</h2>
    <van-dropdown-menu>
      <dropdown-item v-model="value1" :options="option1" title="商品" loading/>
    </van-dropdown-menu>

    <h2 class="demo-desc">强制显示空状态（仅在使用插槽时使用）</h2>
    <van-dropdown-menu>
      <dropdown-item v-model="value1" :options="option1" title="商品" is-empty/>
    </van-dropdown-menu>

    <h2 class="demo-desc">异步options演示</h2>
    <van-dropdown-menu>
      <dropdown-item
          v-model="asyncValue1"
          :options="asyncOption1"
          title="商品"
          :loading="asyncLoading1"
          @open="onOpen1"
      />
      <dropdown-item
          v-model="asyncValue2"
          :options="asyncOption2"
          title="排序"
          :loading="asyncLoading2"
          @open="onOpen2"
      />
    </van-dropdown-menu>
  </div>
</template>

<script>
import {DropdownMenu} from 'vant'
import DropdownItem from '@/DropdownItem'

export default {
  name: 'dropdown-item-demo',

  components: {
    [DropdownMenu.name]: DropdownMenu,
    DropdownItem
  },

  data() {
    return {
      value1: 0,
      option1: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ],

      asyncLoading1: true,
      asyncValue1: 0,
      asyncOption1: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ],
      asyncLoading2: true,
      asyncValue2: 1,
      asyncOption2: []
    }
  },

  methods: {
    onOpen1() {
      this.asyncLoading1 = true
      setTimeout(() => this.asyncLoading1 = false, 1000)
    },
    onOpen2() {
      this.asyncLoading2 = true
      setTimeout(() => this.asyncLoading2 = false, 1000)
    }
  }
}
</script>
