<!--checkbox 多选框-->
<template>
  <el-form-item :label="column.title" :prop="column.columnName">
    <el-checkbox-group v-model="value">
      <el-checkbox v-for="item in list" :label="item.id" :key="item.id">{{
        item.text
      }}</el-checkbox>
    </el-checkbox-group>
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
      type: Array,
      default: () => [],
    },
  },
  setup(props, context){

    let { codeTable } = props.column.codeTable

    if(typeof codeTable === 'object'  && codeTable.constructor === Array) {
      codeTable = 'type'
    }
    const value =computed ({
      get: function() {
        return props.data
      },
      set: function(val) {
        // props.data = val
        context.emit('update:data', val)
      },
    })

    const state = reactive({
      list: []
    })
    const getList = (type) => {
      getContentTypeList(type).then( res => {
        state.list = res.data
      })
    }
    getList(codeTable)
    return {
      ...toRefs(state),
      value
    }
  },
})
</script>
