<!--日期格式类型-->
<template>
  <div>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules">
      <el-date-picker
        style="width:100%"
        v-model="value"
        align="right"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form-item>
  </div>
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
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() < Date.now()
        // },
      },
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
        console.log('this.date', typeof val, val)
        this.$emit('update:data', val)
      },
    },
  },
}
</script>
