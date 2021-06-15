<template>
  <div>
    <nav-bar title="Fab"/>

    <h2 class="demo-desc">基础使用</h2>
    <div class="demo-block" style="margin-top: 150px;margin-left: 50px">
      <fab>
        <fab-item icon="plus" label="测试"/>
        <fab-item icon="cross" label="测试" color="red"/>
        <fab-item icon="arrow" label="测试" color="orange"/>
      </fab>
    </div>

    <h2 class="demo-desc">右侧显示提示文字</h2>
    <div class="demo-block" style="margin-top: 150px;margin-left: 50px">
      <fab label-position="right">
        <fab-item icon="plus" label="测试"/>
        <fab-item icon="cross" label="测试" color="red"/>
        <fab-item icon="arrow" label="测试" color="orange"/>
      </fab>
    </div>

    <h2 class="demo-desc">不显示提示文字</h2>
    <div class="demo-block" style="margin-top: 150px;margin-left: 50px">
      <fab :show-label="false">
        <fab-item icon="plus" label="测试"/>
        <fab-item icon="cross" label="测试" color="red"/>
        <fab-item icon="arrow" label="测试" color="orange"/>
      </fab>
    </div>

    <h2 class="demo-desc">向下打开</h2>
    <div class="demo-block" style="margin-bottom: 150px;margin-left: 50px">
      <fab direction="down">
        <fab-item icon="plus" label="测试"/>
        <fab-item icon="cross" label="测试" color="red"/>
        <fab-item icon="arrow" label="测试" color="orange"/>
      </fab>
    </div>

    <h2 class="demo-desc">异步关闭</h2>
    <div class="demo-block" style="margin-top: 50px;margin-left: 50px">
      <fab :close-on-click="false">
        <fab-item icon="arrow" label="测试" color="orange" @click="asyncClose"/>
      </fab>
    </div>

    <div style="height: 50px"/>

    <fab style="position: fixed;right: 20px;bottom: 20px">
      <fab-item icon="plus" label="测试"/>
      <fab-item icon="cross" label="测试" color="red"/>
      <fab-item icon="arrow" label="测试" color="orange"/>
    </fab>
  </div>
</template>

<script>
import {Dialog} from 'vant'
import Fab from '@/Fab'
import FabItem from '@/Fab/item'

export default {
  name: 'fab-demo',

  components: {Fab, FabItem},

  methods: {
    asyncClose(close) {
      Dialog
          .confirm({message: '确认关闭？'})
          .then(close)
          .catch(() => undefined)
    }
  }
}
</script>
