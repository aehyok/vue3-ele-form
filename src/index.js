import FormView from "./components/input/formView.vue";
import SlTable from "./components/table/index.vue";

FormView.install = Vue => Vue.component(FormView.name, FormView);
SlTable.install = Vue => Vue.component(SlTable.name, SlTable);
export { SlTable };
export default FormView;
