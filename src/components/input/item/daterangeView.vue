import { defineComponent } from '@vue/runtime-core';
<!--日期范围-->
<template>
  <div>
    <el-form-item :label="column.title" :prop="column.name">
      <el-date-picker
      style="width:100%"
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
  </div>
</template>
<script>
import { defineComponent, computed}  from 'vue'
export default defineComponent({
  props:{
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Array,
      default: () => {},
    },
  },
   setup(props,context) {
    const value =computed ({
      get: function() {
        return props.data
      },
      set: function(val) {
        props.data = val
      },
    })
    return {
      value
    }
   }
})
</script>
