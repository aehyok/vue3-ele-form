<template>
<el-col
  :span="columnSpan"
>
  <!--不包含View则是npm组件库中的-->
  <component
    v-if="!column.type.includes('View') && column.type !=='TextSelect'"
    :is="column.type + 'View'"
    :column="column"
    :formData="formData"
    v-model:data="formData[column.name]"
    :columnSpan="columnSpan"
  />

  <!--针对组合录入控件进行单独设置处理--->
  <component
    v-if="!column.type.includes('View') && column.type ==='TextSelect'"
    :is="column.type + 'View'"
    :column="column"
    :formData="formData"
    v-model:leftValue="formData[column.text.name]"
    v-model:rightValue="formData[column.select.name]"
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
import { createApp, defineComponent,computed } from 'vue'
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
import StaticView from '@/components/input/item/static-view.vue'

// 组合式录入控件
import TextSelectView from '@/components/input/compose/text-select-view.vue'
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
    StaticView,
    TextSelectView,
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
    console.log(props.column.type, 'setup.componentView')
    if(props.column.type === 'TextSelect') {
      console.log('text-----------------select')
      console.log(props.formData, props.column)
    }

    const registerComponent = (componentName) => {
      console.log(componentName, 'this.componentName')
      return createApp(componentName.default)
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
      // compose
    }
  },
})
</script>
<style scoped></style>
