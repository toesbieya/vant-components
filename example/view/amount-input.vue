<template>
  <div>
    <nav-bar title="AmountInput"/>

    <h2 class="demo-desc">基础使用</h2>
    <amount-input label="金额" v-model="v1"/>

    <h2 class="demo-desc">只读</h2>
    <amount-input label="金额" v-model="v1" readonly/>

    <h2 class="demo-desc">显示大写金额</h2>
    <amount-input label="金额" v-model="v2" show-capital/>
  </div>
</template>

<script>
import AmountInput from '@/AmountInput'

export default {
  name: 'amount-input-demo',

  components: {AmountInput},

  data() {
    return {
      v1: '1231',
      v2: '1232123.2'
    }
  }
}
</script>
