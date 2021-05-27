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
import TextView from '@/components/input/item/text-view.vue'
import TextareaView from '@/components/input/item/textarea-view.vue'
import NumberView from '@/components/input/item/number-view.vue'
import DateView from '@/components/input/item/date-view.vue'
import SwitchView from '@/components/input/item/switch-view.vue'
import RadioView from '@/components/input/item/radio-view.vue'
import CheckboxView from '@/components/input/item/checkbox-view.vue'
import DaterangeView from '@/components/input/item/daterange-view.vue'
import SelectView from '@/components/input/item/select-view.vue'
import ImageView from '@/components/input/item/image-view.vue'

export default  defineComponent({
  name: 'formView',
  components: {
    TextView,
    TextareaView,
    NumberView,
    DateView,
    DaterangeView,
    SwitchView,
    RadioView,
    CheckboxView,
    SelectView,
    ImageView,
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
