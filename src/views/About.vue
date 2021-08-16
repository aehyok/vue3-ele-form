<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script setup>
 const actionDisplay = {
  1: '创建',
  2: '删除',
  4: '修改',
  8: '详情',
  16: '设置当前栏目树',
  32: '栏目树配置',
  64: '提交审核',
  128: '复制',
  256: '共享',
  512: '停用',
  1024: '导入账号',
  2048: '审核',
  4096: '发布公众号设置',
  8192: '回复',
}

const keys = Object.keys(actionDisplay).map(k => +k) 
console.log(keys, 'keys-------')
</script>