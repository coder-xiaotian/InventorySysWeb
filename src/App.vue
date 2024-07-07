<template>
  <el-config-provider :locale="local">
    <RouterView />
  </el-config-provider>
</template>
<script>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  created() {
    this.local = zhCn
  }
}
</script>
