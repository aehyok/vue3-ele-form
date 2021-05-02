<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-input
      v-model="value"
      type="textarea"
      :placeholder="'请输入' + column.title"
      :rows="3"
      maxlength="30"
    >
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
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
        this.$emit('update:data', val)
      },
    },
  },
}
</script>
