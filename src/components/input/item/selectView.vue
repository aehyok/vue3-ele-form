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
import { formItemMixins } from './formItemMixins.js'
export default {
  mixins: [ formItemMixins ],
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
  data() {
    return {
      // list: [],
      rules: [
        {
          required: this.column.required,
          message: '请输入' + this.column.title,
        },
      ],
    }
  },
  computed: {
    value: {
      get: function() {
        return this.data
      },
      set: function(val) {
        console.log('this.select', typeof val, val)
        this.$emit('update:data', val)
      },
    },
  },
}
</script>
