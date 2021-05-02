import { getContentTypeList } from '@/mock/api'
export const formItemMixins = {
  created() {
    let codeTable = this.column.codeTable
    console.log(typeof codeTable, '----codeTable-----') 
    if(typeof codeTable ===  'object' && codeTable.constructor === Array) {
      this.list = codeTable
    } else {
      this.getList(codeTable)
    }
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    getList(type) {
      getContentTypeList(type).then(res => {
        this.list = res.data
        console.log(res.data, 'categoryType')
      })
    },
  },
}
