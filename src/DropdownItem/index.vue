<script>
/**
 * 添加了loading和空数据的van-dropdown-item
 */
import {DropdownItem as VanDropdownItem, Loading, Empty} from 'vant'

function renderLoading(h) {
  return (
      <div class="dropdown-menu-loading">
        <Loading>加载中...</Loading>
      </div>
  )
}

export default {
  name: 'DropdownItem',

  functional: true,

  props: {
    // 是否显示加载态
    loading: Boolean,
    // 当前是否为空状态，使用自定义插槽时用到
    isEmpty: Boolean
  },

  render(h, context) {
    const {loading, isEmpty} = context.props
    const options = context.data.attrs.options
    const hasOptions = options && options.length

    // 这里认为options为空可能是由于使用了自定义插槽，所以使用props.isEmpty来辅助判断
    const showEmpty = isEmpty || options && !options.length

    // 显示加载或空状态时要移除传递的options
    if ((loading || showEmpty) && hasOptions) {
      context.data.attrs.options = undefined
    }

    return (
        <VanDropdownItem {...context.data}>
          {loading
              ? renderLoading(h)
              : showEmpty
                  ? <Empty description="暂无数据"/>
                  : context.children
          }
        </VanDropdownItem>
    )
  }
}
</script>
