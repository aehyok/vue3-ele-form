<!--分页table-->
<template>
  <el-table
    v-loading.iTable="options.loading"
    :data="list"
    :stripe="options.stripe"
    ref="mutipleTable"
    @selection-change="handleSelectionChange"
  >
    <!--region 选择框-->
    <el-table-column v-if="options.mutiSelect" type="selection" align="center" style="width: 65px;">
    </el-table-column>
    <!---seq 序列号--->
    <el-table-column v-if="options.mutiSelect" label="序号" type="index" align="center" style="width: 65px;">
    </el-table-column>
    <!--endregion-->
    <!--region 数据列-->
    <template v-for="(column, index) in columns" :key="column.label">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.width"
      >
        <template #default="scope">
          <template v-if="!column.render">
            <!-- formattter可自定义字段的显示html -->
            <template v-if="column.formatter">
              <div v-html="column.formatter(scope.row, column)"></div>
            </template>
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
          <template v-else>
            <el-tag type="success">{{ scope.row[column.prop] }}</el-tag>
            <!-- <expand-dom
              :column="column"
              :row="scope.row"
              :render="column.render"
              :index="index"
            ></expand-dom> -->
          </template>
        </template>
      </el-table-column>
    </template>
    <!--endregion-->
    <!--region 按钮操作组-->
    <el-table-column
      ref="fixedColumn"
      label="操作"
      align="center"
      :width="operates.width"
      :fixed="operates.fixed"
      v-if="operates.list.filter(_x => _x.show === true).length > 0"
    >
      <template #default="scope">
        <div class="operate-group">
          <template v-for="(btn, key) in operates.list">
            <div class="item" v-if="btn.show" :key="btn.id">
              <el-button
                :type="btn.type"
                size="mini"
                :icon="btn.icon"
                :disabled="btn.disabled"
                :plain="btn.plain"
                @click.native.prevent="btn.method(key, scope.row, scope.$index)"
              >
                {{ btn.label }}
              </el-button>
            </div>
          </template>
        </div>
      </template>
    </el-table-column>
    <!--endregion-->
  </el-table>
  <page-setting      
    v-model:page="pageModel.page"
    v-model:limit="pageModel.limit"
    v-model:total="pageModel.total"
    @pageChange="pageChange"/>
</template>
<!--endregion-->
<script>
import { defineComponent, reactive, toRefs } from "vue";
import PageSetting from './page-setting.vue'
export default defineComponent({
  name: "SlTable",
  // 自定义显示内容组件
  components: {
    PageSetting,
    expandDom: {
      functional: true,
      props: ["row", "render", "index", "column"],
      // props: {
      //   row: Object,
      //   render: Function,
      //   index: Number,
      //   column: {
      //     type: Object,
      //     default: null
      //   }
      // },
      render: (h, ctx) => {
        // const params = {
        //   row: ctx.props.row,
        //   index: ctx.props.index
        // };
        // if (ctx.props.column) params.column = ctx.props.column;
        // return ctx.props.render(h, params);
      }
    }
  },
  props: {
    pageModel:{
      type: Object,
      default: () => {}
    },
    // 数据列表
    list: {
      type: Array,
      default: () => []
    },
    /*
      需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    */
    columns: {
      type: Array,
      default: () => []
    },
    /*
      操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
     */
    operates: {},
    options: {
      type: Object,
      default: () => {
        //  stripe: false // 是否为斑马纹 table
        //  highlightCurrentRow: false // 是否要高亮当前行
      }
    } // table 表格的控制参数
  },
  setup(props, { emit }) {
    const state = reactive({
      pageIndex: 1,
      multipleSelection: [] // 多行选中
    });

    // 多行选中
    const handleSelectionChange = val => {
      console.log(val, "val");
      state.multipleSelection = val;
      emit("handleSelectionChange", val);
    };

    // 显示 表格操作弹窗
    const showActionTableDialog = () => {
      console.log(4444);
      emit("handelAction");
    };

    const pageChange = () => {
      console.log('pageChange',props.pageModel)
      emit('search')
    }

    return {
      ...toRefs(state),
      handleSelectionChange,
      showActionTableDialog,
      pageChange
    };
  }
});
</script>
<style lang="scss" scoped>
.item {
  display: inline;
  padding-right: 4px;
}
</style>
