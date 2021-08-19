<template>
<el-col
  :span="columnSpan"
>
  <!--不包含View则是npm组件库中的-->
  <component
    v-if="(!column.type.includes('View')) && !column.type.includes('textSelect')" 
    :is="column.type + 'View'"
    :column="column"
    :formData="formData"
    v-model:data="formData[column.name]"
    :columnSpan="columnSpan"
  />

  <component
    v-if="(column.type.includes('textSelect'))" 
    :is="column.type + 'View'"
    :column="column"
    :formData="formData"
    v-model:leftValue="formData[column.text.name]"
    v-model:rightValue="formData[column.select.name]"
    :columnSpan="columnSpan"
  />

  <!--可单独自定义录入组件-->
  <component
    v-if="column.type.includes('View')"
    :is="column.type || registerComponent"
    :column="column"
    :formData="formData"
    v-model:data="formData[column.name]"
    :columnSpan="columnSpan"
  />
</el-col>
</template>
<script>
import { createApp, defineComponent,computed } from 'vue'
import textView from '@/components/input/item-view/textView.vue'
import textareaView from '@/components/input/item-view/textareaView.vue'
import numberView from '@/components/input/item-view/numberView.vue'
import dateView from '@/components/input/item-view/dateView.vue'
import radioView from '@/components/input/item-view/radioView.vue'
import checkboxView from '@/components/input/item-view/checkboxView.vue'
import daterangeView from '@/components/input/item-view/daterangeView.vue'
import selectView from '@/components/input/item-view/selectView.vue'
import imageView from '@/components/input/item-view/imageView.vue'
import staticView from '@/components/input/item-view/staticView.vue'
import switchView from '@/components/input/item-view/switchView.vue'

// 组合式录入控件
import textSelectView from '@/components/input/compose-view/textSelectView.vue'
import numberSelectView from '@/components/input/compose-view/numberSelectView.vue'
export default  defineComponent({
  name: 'formView',
  components: {
    textView,
    textareaView,
    numberView,
    dateView,
    daterangeView,
    switchView,
    radioView,
    checkboxView,
    selectView,
    imageView,
    staticView,
    textSelectView,
    numberSelectView
  },
  props: {
    column: {
      type: Object,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
    columnSpan: {
      type: Number,
      default: 12,
    },
  },
  setup(props, context) {
    console.log(props.column, 'setup.componentView')
    if(props.column.type === 'TextSelect') {
      console.log('text-----------------select')
      console.log(props.formData, props.column)
    }

    const registerComponent = (componentName) => {
      console.log(componentName, 'this.componentName')
      return createApp(componentName.default)
    }

    const isIncludes = () => {
      console.log(["textSelect","numberSelect"].includes(column.type), 'text-number----select')
      return ["textSelect","numberSelect"].includes(column.type)
    }
    // const compose = computed({
    //   get: function() {
    //     let array = []
    //     console.log(props, 'compose')
    //     array.push({"text":props.formData[column.text.name]})
    //     array.push({"select": props.formData[column.text.select]})
    //     return array
    //   }
    // })

    return {
      isIncludes
    }
  },
})
</script>
<style scoped></style>
