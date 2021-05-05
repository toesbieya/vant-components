<template>
  <div class="search-list-demo">
    <nav-bar title="SearchList"/>

    <van-tabs v-model="activeTab">
      <van-tab title="基础使用">
        <div class="search-list-wrapper">
          <search-list
              :refreshing.sync="isRefreshing"
              :loading.sync="isLoadingMore"
              :error.sync="hasError"
              :finished="isFinished"
              @refresh="onRefresh"
              @load="onLoad"
          >
            <van-cell v-for="i in list" :key="i" :title="i"/>
          </search-list>
        </div>
      </van-tab>
      <van-tab title="空状态">
        <div class="search-list-wrapper">
          <search-list :finished="true" disabled-pull-refresh/>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Tabs, Tab, Cell} from 'vant'
import SearchList from '@/SearchList'

let seed = 1

export default {
  name: 'search-list-demo',

  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Cell.name]: Cell,
    SearchList
  },

  data() {
    return {
      activeTab: 0,

      list: [],

      // 是否正在刷新
      isRefreshing: false,
      // 是否正在加载更多
      isLoadingMore: false,
      // 是否已加载全部数据
      isFinished: false,
      // 请求是否出错
      hasError: false
    }
  },

  methods: {
    getList() {
      return new Promise(resolve => {
        const data = Array(10).fill(1).map(() => seed++)
        setTimeout(() => {
          resolve(data)
          this.isFinished = this.list.length >= 20
        }, 500)
      })
    },
    // 下拉刷新
    onRefresh() {
      this.isRefreshing = true
      this.getList()
          .then(list => this.list = list)
          .catch(() => this.hasError = true)
          .finally(() => this.isRefreshing = false)
    },
    // 滚动到底加载更多
    onLoad() {
      this.isLoadingMore = true
      this.getList()
          .then(list => this.list.push(...list))
          .catch(() => this.hasError = true)
          .finally(() => this.isLoadingMore = false)
    }
  },

  mounted() {

  }
}
</script>

<style lang="less">
@import "~vant/lib/style/var.less";

.search-list-demo {
  .search-list-wrapper {
    display: flex;
    height: calc(100vh - @nav-bar-height - @tabs-line-height);

    .van-cell {
      text-align: center;
    }
  }
}
</style>
