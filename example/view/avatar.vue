<template>
  <div class="avatar-demo">
    <nav-bar title="Avatar"/>

    <h2 class="demo-desc">基本使用</h2>
    <div class="demo-block">
      <avatar icon="manager-o"/>
      <avatar icon="manager-o" square/>
    </div>

    <h2 class="demo-desc">类型，支持图片、Icon 以及字符</h2>
    <div class="demo-block">
      <avatar icon="contact"/>
      <avatar>U</avatar>
      <avatar>USER</avatar>
      <avatar style="color: #f56a00; background-color: #fde3cf">U</avatar>
      <avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
    </div>

    <h2 class="demo-desc">自动调整字符大小</h2>
    <div class="demo-block">
      <avatar>{{ v }}</avatar>
      <van-button size="mini" round style="margin-left: 20px" @click="change">改变字符</van-button>
    </div>
  </div>
</template>

<script>
import {Button} from 'vant'
import Avatar from '@/Avatar'

export default {
  name: 'avatar-demo',

  components: {
    [Button.name]: Button,
    Avatar
  },

  data() {
    return {
      v: 'U'
    }
  },

  methods: {
    change() {
      this.v = this.v === 'U' ? 'USER' : 'U'
    }
  }
}
</script>

<style lang="less">
.avatar-demo {
  .avatar + .avatar {
    margin-left: 20px;
  }
}
</style>
