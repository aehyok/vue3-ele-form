<!--简单文本框-->
<template>
  <el-form-item :label="column.title+'：'" :prop="column.name" :rules="rules">
    <el-input
      v-model="value"
      type="textarea"
      :placeholder="'请输入' + column.title"
      :rows="column.rows"
    >
    </el-input>
  </el-form-item>
</template>
<script setup>
import {computed } from "vue"
  const emit = defineEmits(["update:data"])
  const props = defineProps({
    column: {
      type: [Object],
      default: () => {
        return {
          rows: 3
        }
      },
    },
    data: {
      type: String,
      default: '',
    },
  })
  const { column }  = props

  const rules = [
    {
      required: column.required,
      message: `请输入${column.title}`,
      trigger: ['blur', 'change'],
    }
  ]
  
  const value =computed ({
    get: function() {
      return props.data
    },
    set: function(val) {
      // props.data = val
      emit('update:data', val)
    },
  })
</script>
