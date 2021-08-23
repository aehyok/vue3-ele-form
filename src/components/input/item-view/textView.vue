<!--简单文本框-->
<template>
  <el-form-item :label="column.title+'：'" :prop="column.name" :rules="rules">
    <el-input v-model="value" :name="column.name"> </el-input>
  </el-form-item>
</template>
<script setup>
import { computed, ref } from 'vue'
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
 
  const rules = ref([])
  rules.value = [
    {
      required: column.required,
      message: `请输入${column.title}`,
      trigger: ['blur', 'change'],
    }
  ]
  if (column && column.rules) {
    console.log(rules,column.rules, 'column.rules-----------')
    
      rules.value = [...rules.value, ...column.rules]
  }

  const value = computed({
    get: function() {
      return props.data
    },
    set: function(val) {
      emit('update:data',val)
    }
  })
</script>
