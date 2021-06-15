<script>
/**
 * 弹出选项选择器
 */
import {Divider, List, Popup, Cell, Icon, Empty} from 'vant'
import SearchInput from '../SearchInput'
import {isEmpty, debounce} from '../util'

export default {
  name: 'OptionPicker',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: [String, Number, Array],
    // 和van-dropdown-item的options相同的数据结构{value, text}
    options: {type: Array, default: () => ([])},
    // 是否多选
    multiple: Boolean,
    // 是否显示顶部栏（同van-picker），开启后会以圆角显示弹出层
    showToolbar: Boolean,
    // 顶部栏标题（同van-picker），仅在启用showToolbar时有效
    title: String,
    // 是否显示底部的取消按钮
    cancelable: Boolean,
    // 取消按钮文字
    cancelText: {String, default: '取消'},

    /*搜索分页特有属性*/
    // 是否开启搜索分页
    searchable: Boolean,
    // 分页请求的api，传入一个getParam函数，返回一个resolve({list: array 结果集, finished: boolean 是否已加载全部数据})
    api: Function,
    // 是否显示搜索框
    showSearchInput: {type: Boolean, default: true},
    // 搜索框触发查询的时机，'change': 值改变，'enter': 按回车
    searchTrigger: {type: String, default: 'change'},
    // van-search原有属性
    placeholder: String
  },

  data(vm) {
    return {
      // 弹出层的显隐
      show: false,
      // 面板的选中值（开启toolbar时需要点确认按钮才将值传递给外部input事件）
      selectValue: vm.multiple ? [] : null,

      /*搜索分页特有属性*/
      page: 0,
      keyword: '',
      list: [],
      // 弹出层是否打开过，用于van-list的初始化
      hasOpened: false,
      // 是否正在加载数据
      loading: false,
      // 是否已加载全部数据
      isFinished: false,
      // 请求是否出错
      hasError: false
    }
  },

  computed: {
    popupClass() {
      return {
        'option-picker': true,
        'flex': this.searchable || this.cancelable
      }
    },
    /*
    * 是否在点击选项后关闭弹出层
    * 开启顶部栏时false
    * 未开启多选时true
    * 开启多选时选项数量>1时false
    * 否则true
    * */
    shouldCloseAfterClickOption() {
      if (this.showToolbar) return false
      if (!this.multiple) return true
      const options = this.searchable ? this.list : this.options
      return options.length === 1
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.selectValue = v
      }
    }
  },

  methods: {
    getContainer() {
      return document.body
    },
    close() {
      this.show = false
    },
    // 点击选项时触发
    onCellClick({value}) {
      this.shouldCloseAfterClickOption && this.close()

      // 单选
      if (!this.multiple) {
        // 点击已选项则清除选中状态
        if (value === this.selectValue) {
          this.selectValue = null
        }
        else this.selectValue = value
      }
      // 多选
      else {
        // 点击已选项时取消选择，否则加入已选项数组
        const i = this.selectValue.indexOf(value)
        this.selectValue = i !== -1
            ? this.selectValue.slice(0, i).concat(this.selectValue.slice(i + 1))
            : [...this.selectValue, value]
      }

      // 没有显示顶部栏时直接将数据传递给外部
      !this.showToolbar && this.$emit('change', this.selectValue)
    },
    // 点击顶部栏的确认按钮
    onConfirm() {
      this.$emit('change', this.selectValue)
      this.close()
    },
    // 判断是否选中，分单选和多选
    isChecked(value) {
      return this.multiple
          ? this.selectValue.includes(value)
          : this.selectValue === value
    },
    // 弹出层关闭后需要将data.selectedValue重置为props.value
    onPopupClosed() {
      this.selectValue = this.value
    },

    /*搜索分页特有方法*/
    // 刷新
    refresh() {
      this.page = 1
      this.loading = true
      this.api(this.getParam)
          .then(({list, finished}) => {
            this.list = list
            this.isFinished = finished
          })
          .catch(() => this.hasError = true)
          .finally(() => this.loading = false)
    },
    // 滚动到底加载更多
    onLoad() {
      this.page += 1
      this.loading = true
      this.api(this.getParam)
          .then(({list, finished}) => {
            this.list.push(...list)
            this.isFinished = finished
          })
          .catch(() => this.hasError = true)
          .finally(() => this.loading = false)
    },
    // 第一次打开弹出层时加载数据
    onPopupOpened() {
      if (this.hasOpened) return
      this.hasOpened = true
      // 此处不能使用van-list的check()方法
      this.searchable && this.refresh()
    },
    // van-list触发error.sync
    onError(v) {
      this.hasError = v
    },
    // 暴露给props.api调用，获取查询参数
    getParam(keywordName = 'keyword') {
      return {
        page: this.page,
        [keywordName]: this.keyword
      }
    },

    renderOptions(options) {
      return options.map(o => {
        const checked = this.isChecked(o.value)
        return (
            <Cell
                key={o.value}
                title={o.text}
                class={{'van-dropdown-item__option': true, 'van-dropdown-item__option--active': checked}}
                clickable
                on-click={() => this.onCellClick(o)}
            >
              {checked && <Icon class="van-dropdown-item__icon" name="success"/>}
            </Cell>
        )
      })
    },
    renderToolbar() {
      return this.showToolbar && [
        <div class="van-picker__toolbar">
          <button type="button" class="van-picker__cancel" on-click={this.close}>取消</button>
          {!isEmpty(this.title) && <div class="van-ellipsis van-picker__title">{this.title}</div>}
          <button type="button" class="van-picker__confirm" on-click={this.onConfirm}>确认</button>
        </div>,
        <Divider/>
      ]
    },
    renderBottomCancelBtn() {
      return this.cancelable && [
        <div class="van-action-sheet__gap"/>,
        <button type="button" class="van-action-sheet__cancel" on-click={this.close}>取消</button>
      ]
    },
    renderChildren() {
      // 未开启搜索分页
      if (!this.searchable) {
        const options = this.renderOptions(this.options)
        return options.length ? options : <Empty description="暂无数据"/>
      }

      return [
        this.showSearchInput && (
            <SearchInput
                v-model={this.keyword}
                placeholder={this.placeholder}
                on-search={this.refresh}
                {...{on: this.searchTrigger === 'change' && {input: this.refreshOnInput}}}
            />
        ),
        <div class="option-picker-search-list">
          <List
              ref="list"
              v-model={this.loading}
              finished={this.isFinished}
              error={this.hasError}
              immediate-check={false}
              offset={100}
              finished-text="没有更多了"
              error-text="请求失败，点击重新加载"
              on-load={this.onLoad}
              {...{on: {'update:error': this.onError}}}
          >
            {this.renderOptions(this.list)}
            {!this.list.length && (
                <template slot="finished">
                  <Empty description="暂无数据"/>
                </template>
            )}
          </List>
        </div>
      ]
    }
  },

  created() {
    this.refreshOnInput = debounce(() => this.refresh(), 200)
  },

  render(h) {
    return (
        <Popup
            v-model={this.show}
            class={this.popupClass}
            position="bottom"
            round={this.showToolbar}
            duration={0.2}
            get-container={this.getContainer}
            on-closed={this.onPopupClosed}
            {...{on: this.searchable && {opened: this.onPopupOpened}}}
        >
          {this.renderToolbar()}
          {this.renderChildren()}
          {this.renderBottomCancelBtn()}
        </Popup>
    )
  }
}
</script>
