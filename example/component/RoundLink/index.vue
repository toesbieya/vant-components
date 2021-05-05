<script>
import {Icon} from 'vant'

export default {
  name: 'RoundLink',

  functional: true,

  props: {
    title: String,
    to: String
  },

  render(h, context) {
    const {props: {title, to}} = context
    const router = context.parent.$router
    const {href} = router.resolve(to)
    return (
        <a class="round-link" href={href}>
          <span class="van-ellipsis">{title}</span>
          <Icon name="arrow"/>
        </a>
    )
  }
}
</script>
