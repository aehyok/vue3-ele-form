<!--switch切换本身就有值，可以考虑不进行判断必填项-->
<template>
  <el-form-item :label="column.title" :prop="column.name" >
    <el-switch v-model="value"></el-switch>
  </el-form-item>
</template>
<script>
import { defineComponent , computed } from 'vue'
export default defineComponent({
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Boolean,
      default: undefined, // 只有true和false两个值
    },
  },
  setup(props, context) {
    const { column }  = props
    const rules = [
      {
        required: column.required,
        message: `请输入${column.title}`,
      },
    ]
    const value =computed ({
      get: function() {
        return props.data
      },
      set: function(val) {
        // props.data = val
        context.emit('update:data', val)
      },
    })
    return {
      rules,
      value,
    }
  },
})
</script>
