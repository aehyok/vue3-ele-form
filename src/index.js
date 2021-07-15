import FormView from "./components/input/form-view.vue";
import SlTable from "./components/table/index.vue";
import VueJsonEditor from './components/json/vue-json-editor.vue';

FormView.install = Vue => Vue.component(FormView.name, FormView);
SlTable.install = Vue => Vue.component(SlTable.name, SlTable);
VueJsonEditor.install = Vue => Vue.component(VueJsonEditor.name, VueJsonEditor);


export { SlTable,VueJsonEditor };
export default FormView;
