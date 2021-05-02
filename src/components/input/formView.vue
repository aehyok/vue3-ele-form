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
import componentView from './componentView.vue'

export default {
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
  created() {
    console.log(this, 'this.formView')
  },
}
</script>
<style scoped></style>
