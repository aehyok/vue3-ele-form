import { defineComponent, computed } from 'vue';
<!--number数值类型-->
<template>
  <div>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules">
      <el-input type="number" v-model="value"></el-input>
    </el-form-item>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
export default {
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Number,
      default: undefined,
    },
  },
  setup(props, context){
    const { column } = props
    const rules = [
      {
        required: !!column.required,
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
}
</script>
