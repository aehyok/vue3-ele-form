<template>
    <el-row :gutter="20" style="width: 100%;display: flex;flex-direction: column;">
        <draggable
            v-model="columnList"
            group="people"
            @start="dragStartClick"
            @end="dragEndClick"
            item-key="name"
            class="draggClass"
        >
            <template #item="{ element }">
                <div>
                    <component-view
                        :columnSpan="columnSpan"
                        :column="element"
                        :formData="formData"
                        @click="componentExampleClick"
                    >
                    </component-view>
                    <template v-if="element && element.controls">
                        <template v-for="(child) in element.controls ">
                            <template v-if="formData[element.name] === child.value">
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
                </div>
            </template>
        </draggable>
    </el-row>
</template>
<script setup>
  import ComponentView from './input/component-view.vue'
  import draggable from "vuedraggable";
  const props = defineProps({
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
    componentExampleClick: {
      type: Function,
      default: () => {
        
      }
    }
  })
  
  const dragStartClick = () => {
      console.log('ssss-start', props.columnList)
  }

  const dragEndClick = () => {
      console.log("ssss-end", props.columnList)
  }
</script>
<style  scoped="scss">
    .draggClass {
        width: 100%;
    }
</style>
  