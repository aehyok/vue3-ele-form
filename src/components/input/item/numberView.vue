<!--number数值类型-->
<template>
  <div>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules">
      <el-input type="number" v-model="value"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    column: {
      required: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
    },
    data: {
      type: Number,
      default: undefined,
    },
  },
  created() {
    console.log(this.column, 'this.column')
  },
  data() {
    return {
      rules: [
        {
          required: !!this.column.required,
          message: '请输入' + this.column.title,
        },
      ],
    }
  },
  computed: {
    value: {
      get: function() {
        console.log(this, ' numberView')
        return this.data
      },
      set: function(val) {
        console.log(val, typeof val, 'this.val')
        this.$emit('update:data', parseFloat(val))
      },
    },
  },
}
</script>
