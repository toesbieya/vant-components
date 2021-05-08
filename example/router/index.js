import Router from 'vue-router'
import Index from '@example/view/index'
import AmountInput from '@example/view/amount-input'
import Avatar from '@example/view/avatar'
import DropdownItem from '@example/view/dropdown-item'
import SearchList from '@example/view/search-list'
import OptionPicker from '@example/view/option-picker'
import DatePicker from '@example/view/date-picker'
import PickerField from '@example/view/picker-field'

export default new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes: [
    {path: '/', component: Index},
    {path: '/amount-input', component: AmountInput},
    {path: '/avatar', component: Avatar},
    {path: '/dropdown-item', component: DropdownItem},
    {path: '/search-list', component: SearchList},
    {path: '/option-picker', component: OptionPicker},
    {path: '/date-picker', component: DatePicker},
    {path: '/picker-field', component: PickerField}
  ]
})
