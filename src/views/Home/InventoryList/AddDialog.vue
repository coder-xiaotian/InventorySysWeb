<template>
  <el-dialog
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      title="添加库存"
      width="500"
  >
    <el-form :model="formData" label-width="auto" ref="form" :rules="rules">
      <el-form-item label="型号" prop="modelCode">
        <el-input v-model="formData.modelCode" placeholder="请输入型号"></el-input>
      </el-form-item>
      <el-form-item label="简称" prop="modelName">
        <el-input v-model="formData.modelName" placeholder="请输入简称"></el-input>
      </el-form-item>
      <el-form-item label="用途" prop="modelUsage">
        <el-input v-model="formData.modelUsage" placeholder="请输入用途"></el-input>
      </el-form-item>
      <el-form-item label="入库数量" prop="enterNumber">
        <el-input-number v-model="formData.enterNumber" placeholder="请输入入库数量" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="单价" prop="prices">
        <el-input-number v-model="formData.prices" placeholder="请输入单价" controls-position="right" class="mr-2"></el-input-number>元
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div class="text-right">
      <el-button @click="$emit('update:modelValue', false)">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="loading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addProduct} from "@/api/index.js";

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
        modelCode: '',
        modelName: '',
        modelUsage: '',
        enterNumber: null,
        prices: null,
        remark: ''
      }
    }
  },
  watch: {
    modelValue() {
      if (this.modelValue) {
        this.$refs.form?.resetFields()
      }
    }
  },
  created() {
    this.rules = {
      modelCode: [
        { required: true, message: '请输入型号', trigger: 'blur' }
      ],
      modelName: [
        { required: true, message: '请输入简称', trigger: 'blur' }
      ],
      modelUsage: [
        { required: true, message: '请输入用途', trigger: 'blur' }
      ],
      enterNumber: [
        { required: true, message: '请输入入库数量', trigger: 'blur' }
      ],
      prices: [
        { required: true, message: '请输入单价', trigger: 'blur' }
      ],
    }
  },
  methods: {
    handleConfirm() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await addProduct(this.formData)
            this.$emit('added')
          } finally {
            this.loading = false
          }
        }
      })
    },
  }
}
</script>
