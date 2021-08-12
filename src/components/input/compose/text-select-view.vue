<!--简单文本框-->
<template>
    <el-form-item :label="column.title" :prop="column.name" :rules="rules" style="display: flex; flex-direction:row;">
        <el-input v-model="leftValue" :name="column.text.name" style="width:70%;"></el-input>
        <el-select v-model="rightValue" placeholder="请选择" style="width:30%;">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
</template>
<script setup>
import { computed, toRefs,reactive } from 'vue'
const emit = defineEmits(["update:leftValue","update:rightValue"])
const props = defineProps({
    column: {
        type: [Object],
        default: () => {},
    },
    leftValue: {
        type: String,
        default: '',
    },
    rightValue: {
        type: String,
        default: '',
    },
})
console.log(props, 'text-select-view')
const options = [{
    value: '11',
    label: 'm2'
}, {
    value: '22',
    label: '亩'
}]

console.log('text-select')
const { column } = props

const state = reactive({
    leftValue: props.leftValue,
    rightValue: props.rightValue
})

const rules = [
{
    required: column.required,
    message: `请输入${column.title}`,
    trigger: ['blur', 'change'],
}]

const leftValue = computed({
    get: function() {
        return props.leftValue
    },
    set: function(val) {
        emit('update:leftValue',val)
    }
})

const rightValue = computed({
    get: function() {
        return props.rightValue
    },
    set: function(val) {
        emit('update:rightValue',val)
    }
})
</script>
  