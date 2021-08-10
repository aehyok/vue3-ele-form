<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-select v-model="value"  placeholder="请选择" style="width:100%;">
      <el-option
        v-for="item in list"
        :key="item.id"
        :label="item.text"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script>
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { getContentTypeList } from '@/mock/api'
export default defineComponent({
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: String,
      default: () => {},
    },
  },
  setup(props, context) {
    const { column } = props
    let { codeTable } = props.column
    const state = reactive({
      list: []
    })
    if(typeof codeTable === 'object'  && codeTable.constructor === Array) {
      // codeTable = 'type'
      state.list = codeTable
      console.log(state.list , 'codeTable')
    } else if( typeof codeTable === 'string' ) {
      getList(codeTable)
    }
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
        context.emit('update:data', val)
      },
    })
    
    const getList = (type) => {
      getContentTypeList(type).then( res => {
        state.list = res.data
      })
    }

    return {
      ...toRefs(state),
      rules,
      value,
    }
  },
})
</script>
