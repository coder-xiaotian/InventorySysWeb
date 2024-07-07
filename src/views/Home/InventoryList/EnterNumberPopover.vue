<template>
  <el-popover trigger="click" width="300">
    <el-form label-width="auto" ref="enterWarehouseFormRef" :model="formData" :rules="{
                enterNumber: [
                  {required: true, message: '请输入数量', trigger: 'blur'}
                ],
              }">
      <el-form-item label="型号">
        <el-input :model-value="modelCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="简称">
        <el-input :model-value="modelName" disabled></el-input>
      </el-form-item>
      <el-form-item label="入库数量" prop="enterNumber">
        <el-input-number controls-position="right" v-model="formData.enterNumber"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <div class="text-right">
        <el-button type="primary" @click="handleEnterWarehouse(enterWarehouseFormRef)" :loading="loading">确定</el-button>
      </div>
    </el-form>
    <template #reference>
      <el-button type="text" class="!mx-2">入库</el-button>
    </template>
  </el-popover>
</template>
<script>
import {enterWarehouse} from "@/api/index.js";

export default {
  name: "EnterNumberPopover",
  props: {
    id: Number,
    modelCode: String,
    modelName: String,
  },
  emits: ["updated"],
  data() {
    return {
      loading: false,
      formData: {
        enterNumber: 0,
        remark: "",
      },
    }
  },
  methods: {
    handleEnterWarehouse(ref) {
      ref.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await enterWarehouse(this.id, this.formData.enterNumber, this.formData.remark)
            this.$refs.enterWarehouseFormRef.resetFields()
            this.$emit("updated")
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
