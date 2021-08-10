<!--简单文本框-->
<template>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules" style="display: flex; flex-direction:row;">
        <el-input v-model="leftValue" :name="column.text.name" style="width:50%;"></el-input>
        <el-input v-model="rightValue" :name="column.select.name" style="width:50%;"> </el-input>
    </el-form-item>
  </template>
  <script>
  import { computed, defineComponent, toRefs,reactive } from 'vue'
  
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
      console.log('text-select')
      const { column } = props
    
      const state = reactive({
        leftValue: "2",
        rightValue: "3"
      })

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
          ...toRefs(state),
        rules,
        value,
      }
    }
  })
  </script>
  