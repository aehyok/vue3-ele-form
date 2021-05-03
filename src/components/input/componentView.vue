<template>
<el-col
  :span="columnSpan"
>
  <!--不包含View则是npm组件库中的-->
  <component
    v-if="!column.type.includes('View')"
    :is="column.type + 'View'"
    :column="column"
    :formData="formData"
    v-model:data="formData[column.name]"
    :columnSpan="columnSpan"
  />
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
import { createApp, defineComponent } from 'vue'
import textView from '@/components/input/item/textView.vue'
import textareaView from '@/components/input/item/textareaView.vue'
import numberView from '@/components/input/item/numberView.vue'
import dateView from '@/components/input/item/dateView.vue'
import switchView from '@/components/input/item/switchView.vue'
import radioView from '@/components/input/item/radioView.vue'
import checkboxView from '@/components/input/item/checkboxView.vue'
import daterangeView from '@/components/input/item/daterangeView.vue'
import selectView from '@/components/input/item/selectView.vue'
import imageView from '@/components/input/item/imageView.vue'

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
    console.log(props, 'setup.componentView')
    const registerComponent = (componentName) => {
      console.log(componentName, 'this.componentName')
      return createApp(componentName.default)
      // return import(`@/components/input/item/${componentName}.vue`).then(
      //   component => {
      //     console.log(component, 'component')
      //     return Vue.extend(component.default)
      //   },
      // )
    }
    return {

    }
  },
})
</script>
<style scoped></style>
