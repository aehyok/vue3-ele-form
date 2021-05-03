import { defineComponent, computed, toRefs } from 'vue';
<!--radio 单选框-->
<template>
  <div>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules">
      <el-radio-group v-model="value" @change="radioChange">
        <el-radio v-for="item in list" :label="item.id" :key="item.id">
          {{ item.text }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script>
import { getContentTypeList } from '@/mock/api'
import { defineComponent, computed, toRefs, reactive } from 'vue'
export default defineComponent({
  // // 组件嵌套如何引用的问题
  // components: {
  //   FormView: () => import('@/components/input/formView'),
  // },
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    formData: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Number,
      default: undefined,
    },
  },
  setup(props, context) {
    const { column } = props
    let { codeTable } = props.column.codeTable

    if(typeof codeTable === 'object'  && codeTable.constructor === Array) {
      codeTable = 'type'
    }
    const rules = [
      {
        // 加上双？？，防止出现选中后提示请选择"this.column.title"
        required: column.required ?? false,
        message: `请选择${column.title}`,
        trigger: 'change',
      },
    ]
    const value =computed ({
      get: function() {
        return props.data
      },
      set: function(val) {
        props.data = val
      },
    })

    // radio change事件去切换控制其他组件，或者其他几个组件（先考虑控制一个）
    // 要通过一个字段控制，如果是这个字段，则可以进行控制切换状态
    const radioChange = (e) => {
      console.log(e, column, 'this.radioChange')
      context.emit("evenName", '')
    }

    const state = reactive({
      list: []
    })
    const getList = (type) => {
      getContentTypeList(type).then( res => {
        state.list = res.data
      })
    }
    getList(codeTable)

    return {
      ...toRefs(state),
      rules,
      value,
      radioChange

    }
  },
})
</script>
