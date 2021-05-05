<template>
  <div class="search-list">
    <van-pull-refresh
        :value="refreshing"
        :disabled="disabledPullRefresh"
        @input="onRefreshingInput"
        @refresh="onRefresh"
    >
      <van-list
          ref="list"
          :loading="loading"
          :finished="finished"
          :error="error"
          :immediate-check="immediateCheck"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @input="onLoadingInput"
          @update:error="onErrorUpdate"
          @load="onLoad"
      >
        <slot/>
        <template #finished v-if="!$slots.default || !$slots.default.length">
          <van-empty description="没有数据"/>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/**
 * 集合了下拉刷新和加载更多的搜索列表
 * 引用时需要保证父级是flex
 */
import {List, PullRefresh, Empty} from 'vant'

export default {
  name: 'SearchList',

  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Empty.name]: Empty
  },

  props: {
    refreshing: Boolean,
    disabledPullRefresh: Boolean,

    loading: Boolean,
    finished: Boolean,
    error: Boolean,
    immediateCheck: {type: Boolean, default: true}
  },

  methods: {
    onRefreshingInput(v) {
      this.$emit('update:refreshing', v)
    },
    onRefresh() {
      this.$emit('refresh')
    },

    onLoadingInput(v) {
      this.$emit('update:loading', v)
    },
    onErrorUpdate(v) {
      this.$emit('update:error', v)
    },
    onLoad() {
      this.$emit('load')
    }
  }
}
</script>
