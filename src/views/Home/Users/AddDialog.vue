<template>
  <el-dialog
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      title="添加用户"
      width="500"
  >
    <el-form :model="formData" label-width="auto" ref="form" :rules="rules">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="formData.realName" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div class="text-right">
      <el-button @click="$emit('update:modelValue', false)">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="loading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addUser} from "@/api/index.js";

export default {
  name: 'AddDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
  },
  emits: ["update:modelValue", "added"],
  data() {
    return {
      loading: false,
      formData: {
        userName: '',
        realName: '',
        password: '',
        isEnabled: true
      }
    }
  },
  created() {
    this.rules = {
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      realName: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    }
  },
  methods: {
    handleConfirm() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await addUser(this.formData)
            this.$refs.form.resetFields()
            this.$emit('update:modelValue', false)
            this.$emit('added')
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
