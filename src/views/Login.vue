<template>
  <div class="w-full h-full flex justify-center items-center bg-[url(@/assets/bg.png)]">
    <div class="p-4 bg-red-50/40 rounded-xl backdrop-blur-xl">
      <div class="flex justify-center items-center mb-4">
        <img src="@/assets/logo.png" class="w-8 h-8" />
        <span class="inline-block ml-2">库存管理系统</span>
      </div>
      <el-form label-width="auto" :model="formData" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="account">
          <el-input v-model="formData.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="w-full" type="primary" @click="handleLogin" :loading="loading">登陆</el-button>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/index.js";

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      formData: {
        account: '',
        password: ''
      },
      loading: false
    }
  },
  created() {
    this.rules = {
      account: [
        {required: true, message: '请输入账号', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'}
      ]
    }
  },
  methods: {
    handleLogin(e) {
      e.preventDefault()
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await login(this.formData.account, this.formData.password)
            this.$router.push('/')
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
