<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="formData" label-width="120px" :ref="dom">
          <form-view
            :columnList="state.formConfig.formListItem"
            :formData="formData"
            :columnSpan="state.formConfig.cols"
          />
        </el-form>
      </el-col>
      <el-col :span="12">
        <vue-json-editor
          v-model:value="state.formConfig"
          :options="state.options"
          :plus="false"
          height="800px"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-button
        size="large"
        type="primary"
        style="margin-left: 120px;height: 50px;"
        @click="submitForm"
        native-type="submit"
      >
        提交
      </el-button>
    </el-row>
  </div>
</template>
<script setup>
import {reactive, toRefs, ref } from "vue";
import FormView from "../components/form-view.vue";
import VueJsonEditor from '../components/json/vue-json-editor.vue'

  let refs = ref("");
  const dom = el => {
    refs = el;
  };

  let unitList = ref([])
  unitList.value = [{ id:"2", text: "亩"}]

  let list = ref([])
  
  const formData = reactive({
    staticData: '测试数据组合',
    name: "主菜单栏目",
    total: null,
    count: null,
    createDate: 1606730360386,
    type: 1,
    requireType: undefined,
    creType: undefined,
    range: [],
    isExpired: false,
    isValid: true,
    type11: 1,
    area: "2",
    unit:"",
    requireType: 1,
  })

  const changeUnit = (value) => {
    console.log('unit --- unit', value===2)
    if(value === 2) {
      unitList.value = [{ id:"2", text: "M²"}]
      formData.unit = "2"
    } else if(value > 0){
      unitList.value = [{ id:"1", text: "亩"}]
      formData.unit = "1"
    } else {
      unitList.value = [{ id:"2", text: "M²"}]
      formData.unit = ""
    }
  }

  const state = reactive({
    options: {
      mode: "code",
      mainMenuBar: false
    },
    show: true,
    formConfig: {
      cols: 24,
      formListItem: [
        {
          name: "staticData",
          type: "static",
          title: "社区/村",
        },
        {
          name: "creType",
          type: "select",
          title: "地块类型",
          changeFunction: changeUnit,
          required: true,
          codeTable: list,
        },
        {
          name: "name1",
          type: "text",
          title: "地块名称",
          rules:[
          { pattern: /(rtmp):\/\/([\w.]+\/?)\S*/, message: '请输入rtmp://开头的地址' }
        ],
          required: true // 必填
        },
        {
          type: "textSelect",
          title: "地块面积",
          rules:[
              { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入数字最多两位小数' }
          ],
          text: {
            name: "area",
          },
          select: {
            name: "unit",
            codeTable: unitList
          }
        },
        {
          name: "creType1",
          type: "select",
          // multiple: true,
          codeTable: [
            { id: 1, text: "耕地"},
            { id: 2, text: "宅基地"},
            { id: 3, text: "自留地"},
            { id: 4, text: "林地"},
          ],
          title: "地块所属",
        },
        {
          name: "location",
          type: "textarea",
          title: "地块位置",
          rules:[
          { pattern: /(rtmp):\/\/([\w.]+\/?)\S*/, message: '请输入rtmp://开头的地址' }
        ],
          // row: 6,
        },
        {
          name: "descript",
          type: "textarea",
          title: "备注",
          required: true,
          rows: 6,
          maxlength: 10,
          minlength: 4
        },
        {
          name: "type11",
          type: "select",
          codeTable: [
            {id : 1, text: "图片"},
            {id : 2, text: "视频"}
          ],
          title: "图片/视频",
          controls: [
            {
              value: 1,
              showCondition: [
                {
                  name: "image11",
                  type: "image",
                  title: "上传图片"
                }
              ]
            },
            {
              value: 2,
              showCondition: [
                {
                  name: "",
                  type: "select",
                  title: "未接种原因"
                }
              ]
            }
          ]
        },        
        {
          name: "name",
          type: "text",
          title: "栏目名称"
        },
        {
          name: "total",
          type: "number",
          title: "栏目数量",
          required: true
        },
        {
          name: "count",
          type: "number",
          title: "浏览数量"
        },
        {
          name: "content",
          type: "textarea",
          title: "内容"
        },
        {
          name: "startDate",
          type: "date",
          title: "开始日期",
          required: true
        },
        {
          name: "endDate",
          type: "date",
          title: "结束日期"
        },
        {
          name: "isValid",
          type: "switch",
          title: "是否有效"
        },
        {
          name: "isExpired",
          type: "switch",
          title: "是否过期",
          required: true
        },
        {
          name: "requireType",
          type: "radio",
          codeTable: [
            {id : 1, text: "图片"},
            {id : 2, text: "视频"},
            {id : 3, text: "图文"},
          ],
          title: "图文类型",
          required: true
        },
        {
          name: "range",
          type: "checkbox",
          title: "发布范围",
          codeTable: "isp",
          required: true
        },
        {
          name: "dateRange",
          type: "daterange",
          title: "日期范围"
        },
        {
          name: "creType",
          type: "select",
          // multiple: true,
          codeTable: [
            { id:1, text: "耕地"},
            { id:2, text: "宅基地"},
            { id:3, text: "自留地"},
            { id:4, text: "林地"},
          ],
          title: "证件类型"
        },
        {
          name: "image",
          type: "image",
          title: "头像"
        }
      ],
    }
  });

  list.value =[
            { id: 1, text: "耕地"},
            { id: 2, text: "宅基地"},
            { id: 3, text: "自留地"},
            { id: 4, text: "林地"},
          ]
  const submitForm = () => {
    console.log(state.formConfig.formData, "formData");
    refs.validate(valid => {
      if (valid) {
        console.log(valid, "this.valid");
      } else {
        console.log(valid, "验证失败");
      }
      return false;
    });
  };
</script>
<style scoped></style>
