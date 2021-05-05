<script>
/**
 * 给van-search包了一层form
 */
import {Search} from 'vant'

export default {
  name: 'SearchInput',

  functional: true,

  render(h, context) {
    return (
        <form action="/">
          <Search {...context.data}/>
        </form>
    )
  }
}
</script>
