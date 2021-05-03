<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-input v-model="value" :name="column.name"> </el-input>
  </el-form-item>
</template>
<script>
import { computed, defineComponent } from "@vue/runtime-core"

export default  defineComponent({
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const { column } = props
    const rules = [
      {
        required: column.required,
        message: `请输入${column.title}`,
        trigger: ['blur', 'change'],
      }
    ]

    const value = computed({
      get: function() {
        return props.data
      },
      set: function(val) {
        // props.data = val
        context.emit('update:data',val)
      }
    })
    return {
      rules,
      value,
    }
  }
})
</script>
