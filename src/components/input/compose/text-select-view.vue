<!--简单文本框-->
<template>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules" style="display: flex; flex-direction:row;">
        <el-input v-model="leftValue" :name="column.text.name" style="width:70%;"></el-input>
        <el-select v-model="value" placeholder="请选择" style="width:30%;">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
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
      console.log(props, 'text-select-view')
      const options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]

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
          context.emit('update:data',val)
        }
      })

      return {
          ...toRefs(state),
        rules,
        value,
        options
      }
    }
  })
  </script>
  