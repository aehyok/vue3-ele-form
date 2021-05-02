<!--checkbox 多选框-->
<template>
  <div>
    <el-form-item :label="column.title" :prop="column.columnName">
      <el-checkbox-group v-model="value">
        <el-checkbox v-for="item in list" :label="item.id" :key="item.id">{{
          item.text
        }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </div>
</template>
<script>
import { formItemMixins } from './formItemMixins.js'
export default {
  mixins: [formItemMixins],
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
  data() {
    return {
      // list: [],
    }
  },
  computed: {
    value: {
      get: function() {
        return this.data
      },
      set: function(val) {
        this.$emit('update:data', val)
      },
    },
  },
}
</script>
