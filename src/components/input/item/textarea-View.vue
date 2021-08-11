<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-input
      v-model="value"
      type="textarea"
      :placeholder="'请输入' + column.title"
      :rows="6  "
      maxlength="30"
    >
    </el-input>
  </el-form-item>
</template>
<script setup>
import { defineProps, computed, defineEmits } from "vue"
  const emits = defineEmits(["update:data"])
  const props = defineProps({
    column: {
      type: [Object],
      default: () => {},
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
    },
  ]
  const value =computed ({
    get: function() {
      return props.data
    },
    set: function(val) {
      // props.data = val
      emits('update:data', val)
    },
  })
</script>
