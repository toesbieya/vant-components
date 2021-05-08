<script>
/**
 * 带底部选择器的van-field
 */

import {Field} from 'vant'
import OptionPicker from '../OptionPicker'
import DatePicker from '../DatePicker'
import {isEmpty} from '../util/index'

export default {
  name: 'PickerField',

  props: {
    // 选择器的值，支持v-model
    value: [String, Number, Array],
    // 选择器类型，'date' | 'option'
    type: {type: String, default: 'option'},
    // 显示的值，优先使用
    fieldValue: [String, Number],
    // 是否只读，true时不会渲染选择器
    readonly: Boolean,
    // 选择器的顶栏标题，默认为props.placeholder
    pickerTitle: String,

    /* OptionPicker的原有props */
    options: Array,
    multiple: Boolean,
    showToolbar: Boolean,
    searchable: Boolean,
    api: Function,
    showSearchInput: Boolean,
    searchTrigger: String,
    searchPlaceholder: String, // OptionPicker.props.placeholder

    /*DatePicker的原有props*/
    dateType: String,          // DatePicker.props.type
    minDate: Date,
    maxDate: Date,

    /* van-field的原有props */
    label: String,
    placeholder: String,
    required: Boolean,
    rules: Array,
    inputAlign: String
  },

  computed: {
    // van-field显示的值
    displayFieldValue() {
      const {value, fieldValue} = this

      // 优先使用props.fieldValue
      if (!isEmpty(fieldValue) || isEmpty(value)) {
        return fieldValue
      }

      // 如果是日期选择器，直接返回props.value
      if (this.type === 'date') return value

      // 需要根据是否开启搜索分页来确定选项数组
      let options
      if (this.searchable) {
        const picker = this.$refs.picker
        if (!picker) return
        options = picker.list
      }
      else options = this.options

      // 多选时返回以逗号连接的选中项text
      if (this.multiple) {
        const selected = options.filter(i => this.value.includes(i.value))
        return selected.map(i => i.text).join(',')
      }

      // 单选时返回选中项text
      const selected = options.find(i => i.value === value)
      return selected && selected.text
    },
    // 启用required时给一个默认的rules
    fieldRules() {
      return this.rules
          ? this.rules             // 优先使用传入的props.rules
          : this.required
              ? [{required: true}]
              : undefined
    }
  },

  methods: {
    onPickerChange(v) {
      this.$emit('input', v)
    },
    openPicker() {
      this.$refs.picker.show = true
    },
    onClear() {
      // 多选时props.value是数组类型
      const initialValue = Array.isArray(this.value) ? [] : null
      this.$emit('input', initialValue)
      this.$emit('clear')
    },

    renderField(h) {
      const {readonly} = this
      return (
          <Field
              ref="field"
              value={this.displayFieldValue}
              label={this.label}
              placeholder={this.placeholder}
              required={this.required}
              rules={this.fieldRules}
              input-align={this.inputAlign}
              readonly={this.readonly}
              clearable
              clear-trigger="always"
              on-clear={this.onClear}
              {...{
                props: {isLink: !readonly},
                on: !readonly && {click: this.openPicker}
              }}
          />
      )
    },
    renderOptionPicker(h) {
      return (
          <OptionPicker
              ref="picker"
              value={this.value}
              options={this.options}
              multiple={this.multiple}
              show-toolbar={this.showToolbar}
              title={this.pickerTitle || this.placeholder}
              searchable={this.searchable}
              api={this.api}
              show-search-input={this.showSearchInput}
              search-trigger={this.searchTrigger}
              placeholder={this.searchPlaceholder}
              on-change={this.onPickerChange}
          />
      )
    },
    renderDatePicker(h) {
      return (
          <DatePicker
              ref="picker"
              value={this.value}
              type={this.dateType}
              min-date={this.minDate}
              max-date={this.maxDate}
              title={this.pickerTitle || this.placeholder}
              on-change={this.onPickerChange}
          />
      )
    },
    renderPicker(h) {
      return this.type === 'option'
          ? this.renderOptionPicker(h)
          : this.renderDatePicker(h)
    }
  },

  mounted() {
    // 避免van-field在readonly时不显示清除图标
    this.$watch(
        'readonly',
        v => {
          const input = this.$refs.field.$refs.input
          input && input.setAttribute('readonly', v)
        },
        {immediate: true}
    )
  },

  render(h) {
    const field = this.renderField(h)

    // 设置了readonly时，不需要渲染选择器
    return this.readonly
        ? field
        : h('div', [field, this.renderPicker(h)])
  }
}
</script>
