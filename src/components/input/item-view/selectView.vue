<!--简单文本框-->
<template>
  <el-form-item :label="column.title+'：'" :prop="column.name" :rules="rules">
    <el-select v-model="value" clearable  :placeholder="'请选择' + column.title" style="width:100%;" @change="changeSelectClick" @clear="clearClick">
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
  const emit = defineEmits(["update:data"])
  const props = defineProps ({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Number,
      default: undefined,
    },
  })

  const { column } = props
  let { codeTable } = props.column
  const state = reactive({
    list: []
  })

  const getList = (type) => {
    getContentTypeList(type).then( res => {
      state.list = res.data
    })
  }

  if(typeof codeTable === 'object'  && codeTable.constructor === Array) {
    // codeTable = 'type'
    state.list = codeTable
    console.log(state.list , 'codeTable------------')
  } else if( typeof codeTable === 'string' ) {
    getList(codeTable)
  }

  const rules = [
    {
      required: column.required,
      message: `请选择${column.title}`,
    },
  ]

  const value =computed ({
    get: function() {
      return props.data
    },
    set: function(val) {
      emit('update:data', val)
    },
  })

  const changeSelectClick = (item) => {
    console.log(item ,'current-select-item')
    if(props.column && props.column.changeFunction) {
      console.log(item ,'current-select-item------------22222222222')
      props.column.changeFunction(item)
    }
  }

  const clearClick = () => {
    if(props.column && props.column.changeFunction) {
      props.column.changeFunction(0)
    }
  }
</script>
