<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-select v-model="value"  placeholder="请选择" style="width:100%;">
      <el-option
        v-for="item in state.list"
        :key="item.id"
        :label="item.text"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script setup>
import { computed, reactive, toRefs } from 'vue'
import { getContentTypeList } from '@/mock/api'
  const emits = defineEmits(["update:data"])
  const props = defineProps ({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: String,
      default: () => {},
    },
  })
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
      emits('update:data', val)
    },
  })

  const getList = (type) => {
    getContentTypeList(type).then( res => {
      state.list = res.data
    })
  }

</script>
