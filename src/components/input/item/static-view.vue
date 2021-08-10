<!--简单文本框-->
<template>
    <el-form-item :label="column.title" :prop="column.name">
      <span>{{value}}</span>
    </el-form-item>
  </template>
  <script>
  import { computed, defineComponent } from 'vue'
  
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
  
      const value = computed({
        get: function() {
          return props.data
        },
      })
      return {
        value,
      }
    }
  })
  </script>
  