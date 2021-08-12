<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-input v-model="value" :name="column.name"> </el-input>
  </el-form-item>
</template>
<script setup>
import { computed } from 'vue'
  const emit = defineEmits(["update:data"])
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
  const { column } = props
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
      emit('update:data',val)
    }
  })
</script>
