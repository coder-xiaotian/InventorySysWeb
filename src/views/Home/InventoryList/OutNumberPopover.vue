<template>
  <el-popover trigger="click" width="300">
    <el-form label-width="auto" ref="outWarehouseFormRef" :model="formData" :rules="{
                outNumber: [
                  {required: true, message: '请输入数量', trigger: 'blur'}
                ],
              }">
      <el-form-item label="型号">
        <el-input :model-value="modelCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="简称">
        <el-input :model-value="modelName" disabled></el-input>
      </el-form-item>
      <el-form-item label="出库数量" prop="outNumber">
        <el-input-number controls-position="right" v-model="formData.outNumber"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <div class="text-right">
        <el-button type="primary" @click="handleOutWarehouse(outWarehouseFormRef)" :loading="loading">确定</el-button>
      </div>
    </el-form>
    <template #reference>
      <el-button type="text">出库</el-button>
    </template>
  </el-popover>
</template>
<script>
import {outWarehouse} from "@/api/index.js";

export default {
  name: "OutNumberPopover",
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
        outNumber: 0,
        remark: "",
      },
    }
  },
  methods: {
    handleOutWarehouse(ref) {
      ref.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            await outWarehouse(this.id, this.formData.outNumber, this.formData.remark);
            this.$refs.outWarehouseFormRef.resetFields();
            this.$emit("updated");
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
