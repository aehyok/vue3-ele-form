<template>
  <el-row :gutter="20">
    <template
      v-for="(item, index) in columnList"
      :key="index+'formView'"
    >
      <component-view
        :columnSpan="columnSpan"
        :column="item"
        :formData="formData"
      />
        <template v-for="(child) in item.controls ">
            <template v-if="formData[item.name] === child.value">
              <template v-for="(childColumn, columnIndex) in child.showCondition"  :key="columnIndex+'childColumnView'">
                <component-view
                  :columnSpan="columnSpan"
                  :column="childColumn"
                  :formData="formData"
                />
              </template>
            </template>
        </template>
    </template>
  </el-row>
</template>
<script>
import { defineComponent } from 'vue'
import componentView from './componentView.vue'

export default  defineComponent({
  name: 'formView',
  components: {
    componentView,
  },
  props: {
    columnList: {
      type: Array,
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
    // console.log(props, 'setup.formView')
  }
})
</script>
<style scoped></style>
