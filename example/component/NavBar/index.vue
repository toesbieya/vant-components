<script>
import {NavBar} from 'vant'

export default {
  name: 'NavBar',

  functional: true,

  props: {title: String},

  render(h, context) {
    const {props: {title}} = context
    return h(
        NavBar,
        {
          props: {title, leftArrow: true},
          on: {'click-left': () => context.parent.$router.push('/')}
        }
    )
  }
}
</script>
