import { defineComponent } from "vue";
import  { toRefs } from 'vue'
import { getContentTypeList } from '@/mock/api'
export default function() {

  const getList = (type) => {
    getContentTypeList(type).then( res => {
      state.list = res.data
    })
  }
  return {
    ...toRefs(state)
  }
}
