<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <div class="upload">
      <el-upload
        class="avatar-uploader"
        ref="upload"
        :action="upLoadUrl"
        :on-success="handleUploadSuccess"
        :headers="headers"
        :limit="limit"
        list-type="picture"
        multiple
        style="width:100%"
        :accept="accept"
        :file-list="fileList"
        :on-remove="removeSuccess"
        :on-error="uploadError"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </el-form-item>
</template>

<script>
export default {
  components: {},
  props: {
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: String,
      default: () => {},
    },
    fileType: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 10,
    },
    sizeLimit: {
      type: Number,
      default: 4096, // kb
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png, .bmp',
    },
    isMaterial: {
      type: Boolean,
      default: false,
    },
    requiredAudit: {
      type: String,
      default: 'no',
    },
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  data() {
    return {
      rules: [
        {
          required: this.column.required,
          message: '请输入' + this.column.title,
        },
      ],
      headers: {},
      upLoadUrl: '', // 上传地址
    }
  },
  created() {
    // const user = JSON.parse(localStorage.getItem('authorization'))
    this.headers = {
      // Authorization: `${user.token_type} ${user.access_token}`,
    }
    const prefix =
      process.env.NODE_ENV === 'development'
        ? 'http://api.sea.sykj.tech:10450'
        : 'http://api.sea.sykj.tech:10450'
    this.upLoadUrl = `${prefix}/dvm/api/Common/Upload?r=${Math.random()}`
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      console.log(fileList, 'fileList')
      console.log(response, 'response')
      console.log(this.fileList, 'this.fileList++++++++++++++++++++')
      const list = fileList
      this.$emit('uploadCallBack', list)
    },
    removeSuccess(file, fileList) {
      console.log(file, fileList, 'removeSuccess')
      this.$emit('uploadCallBack', fileList)
    },
    uploadError(error) {
      console.log(error)
      alert('授权信息已过期，请重新授权')
      localStorage.removeItem('authorization')
      window.location.href = '/#/login'
    },
    beforeAvatarUpload(file) {
      console.log(file, 'beforeAvatarUpload')
      if (this.fileType === 'img') {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJPG) {
          this.$message.error('上传图片只能是 jpg 、jpeg 、png 格式!')
          return false
        }
      }
      const oversize = file.size / 1024 / 1024 < this.sizeLimit / 1000
      if (!oversize) {
        this.$message.error(`上传文件大小不能超过 ${this.sizeLimit}KB`)
      }
      return oversize
    },
  },
}
</script>

<style scoped>
:deep(.el-upload) {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

:deep(.el-upload:hover) {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 260px;
  height: 145px;
  line-height: 145px;
  text-align: center;
}
.avatar {
  width: 260px;
  height: 145px;
  display: block;
}
</style>
