<template>
  <div class="demo-home">
    <h1 class="demo-home__title">
      <img src="https://img01.yzcdn.cn/vant/logo.png">
      <span>Vant Components</span>
    </h1>
    <h2 class="demo-home__desc">基于vant封装的业务组件</h2>

    <round-link title="Avatar 头像" to="/avatar"/>
    <round-link title="DropdownItem 带加载和空状态的下拉菜单" to="/dropdown-item"/>
    <round-link title="OptionPicker 弹出选项选择器" to="/option-picker"/>
    <round-link title="DatePicker 弹出日期选择器" to="/date-picker"/>
    <round-link title="PickerField 带选择器的表单项" to="/picker-field"/>
    <round-link title="SearchList 下拉刷新 + 无限滚动" to="/search-list"/>

  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>
