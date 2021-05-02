<template>
  <el-form-item>
    <el-upload
      ref="upload"
      :action="upLoadUrl"
      :on-success="handleUploadSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
      :limit="limit"
      :multiple=multiple
      list-type="picture"
      accept=".jpg,.jpeg,.png, .bmp"
      :data="formData"
      class="uploadClass"
    >
      <el-button type="primary">本地上传</el-button>
    </el-upload>
  </el-form-item>
</template>
<script>
export default {
  props: {
    showUpLoadBtn: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    limitCount: {
      type: Number,
      default: 1,
    },
    picType: {
      type: String,
      default: 'add',
    },
    /**
     * 适用运营商
     */
    serviceProvider: {
      default: 0,
    },
    receivefatData: {
      type: [Object, Array],
      default: () => [],
    },
    /**
     * 0全部，1图片，2视频
     */
    type: {
      type: Number,
      default: 1,
    },
    sizeLimit: {
      type: Number,
      default: 2048, // kb
    },
  },
  computed: {
    receiveData() {
      return this.receivefatData
    },
    isAdd() {
      return this.picType === 'add'
    },
    limit() {
      return this.limitCount - this.receivefatData.length
    },
    formData(){
     if(this.showUpLoadBtn){
       return {
        isMaterial: true,
       }
     }else{
       return {}
     }
    },
  },
  data() {
    return {
      headers: {},
      materialVisible: false,
      showBox: false,
      upLoadUrl: '', // 上传地址
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('loginInfo'))
    this.headers = {
      Authorization: user.token,
    }
    const prefix = process.env.NODE_ENV === 'development' ? '/infra' : ''

    this.upLoadUrl = `${prefix}/api/console/system/upload`
  },
  methods: {
    // 移除图片
    removeImgs(item) {
      this.$emit('remove', item)
    },
    // 选择图片
    selectPicture(data) {
      this.$emit('add', data)
    },
    // 点击图块
    handlePostClick() {
      this.showBox = true
    },
    handleUploadSuccess(response, file, fileList) {
      const isFinish = fileList.reduce((result, file) => {
        return file.percentage === 100
      }, false)

      const res = fileList
        .filter(f => f.percentage === 100)
        .map(f => f.response.data)
      this.$emit('add', res.concat(this.receivefatData))

      if (isFinish) {
        this.showBox = false
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const oversize = file.size / 1024 / 1024 < this.sizeLimit / 1000

      if (!isJPG) {
        this.$message.error('上传图片只能是 jpg 、jpeg 、png 格式!')
      }
      if (!oversize) {
        this.$message.error(`上传图片大小不能超过 ${this.sizeLimit}KB!`)
      }
      return isJPG && oversize
    },
    getSystemList() {
      this.showBox = false
      this.materialVisible = true
    },
    handleClosed() {
      if (this.showUpLoadBtn) this.$refs.upload.clearFiles()
    },
  },
}
</script>
<style scoped lang="scss">
  .uploadClass{
    display: inline-block;
    width:100%;
    flex:1
  }
</style>
