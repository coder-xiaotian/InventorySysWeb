<template>
  <el-dialog
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      title="明细"
      width="800"
  >
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" max-height="500">
      <el-table-column prop="type" label="操作类型">
        <template #default="{row}">
          <span>{{ row.type === 1 ? "入库" : "出库" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量">
      </el-table-column>
      <el-table-column prop="createTime" label="时间">
      </el-table-column>
      <el-table-column prop="remark" label="备注"/>
      <el-table-column prop="createdBy" label="创建人"/>
    </el-table>
    <el-pagination
        class="justify-end mt-4"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="size => pagination.pageSize = size"
        @current-change="page => pagination.currentPage = page"
    />
  </el-dialog>
</template>
<script>
import {queryInventoryDetails} from "@/api/index.js";

export default {
  name: "DetailDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    id: [Number, null]
  },
  emits: ["update:modelValue"],
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  watch: {
    modelValue() {
      if (this.modelValue) {
        this.pagination.currentPage = 1
      }
    },
    'pagination.currentPage'() {
      this.queryData()
    },
    'pagination.pageSize'() {
      this.queryData()
    }
  },
  methods: {
    async queryData() {
      this.loading = true
      try {
        const data = await queryInventoryDetails(this.id, this.pagination.currentPage, this.pagination.pageSize)
        this.tableData = data.content
        this.pagination.total = data.totalElements
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
