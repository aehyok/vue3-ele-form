<template>
  <div>
    <sl-table
      :list="list"
      @handleSelectionChange="handleSelectionChange"
      :options="options"
      :columns="columns"
      :operates="operates"
      v-model:pageModel="pageModel"
      @search="search"
    >
    </sl-table>
  </div>
</template>
<script>
import slTable from "@/components/table";
import { defineComponent, reactive, toRefs } from "vue";
import { list, columns } from './tableConfig'
export default defineComponent({
  components: { slTable },
  setup() {
    // 选中行
    const handleSelectionChange = val => {
      console.log("handleSelectionChange-val:", val);
    };
    // 编辑
    const handleEdit = (index, row, idx) => {
      console.log("index:", index, idx);
      console.log("row:", row);
    };
    // 删除
    const handleDel = (index, row) => {
      console.log(" index:", index);
      console.log(" row:", row);
    };
    
    const state = reactive({
      pageModel: {
        page: 1,
        limit: 10,
        total: 17,
      },
      list:[], // table数据
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true // 是否支持列表项选中功能
      }, // table 的参数
      columns: [], // 需要展示的列
      operates: {
        width: 200,
        fixed: "right",
        list: [
          {
            id: "1",
            label: "编辑",
            type: "warning",
            show: true,
            plain: true,
            disabled: false,
            method: (index, row, ss) => {
              handleEdit(index, row, ss);
            }
          },
          {
            id: "2",
            label: "删除",
            type: "danger",
            show: true,
            plain: false,
            disabled: false,
            method: (index, row) => {
              handleDel(index, row);
            }
          }
        ]
      } // 列操作按钮
    });

    state.list = list
    state.columns = columns
    const search = () => {
      state.list = [...state.list]
      console.log(state.pageModel, 'state.pageModel')
    }
    return {
      ...toRefs(state),
      handleSelectionChange,
      handleEdit,
      handleDel,
      search,
    };
  }
});
</script>
