<template>
  <div class="p-8">
    <div class="text-right">
      <el-button type="primary" @click="this.openAdd = true">新增用户</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" max-height="600" v-loading="loading">
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="realName" label="真实姓名"/>
      <el-table-column prop="createdBy" label="创建人"/>
      <el-table-column prop="createdTime" label="创建时间"/>
      <el-table-column prop="updatedBy" label="更新人"/>
      <el-table-column prop="updatedTime" label="更新时间"/>
      <el-table-column label="状态">
        <template #default="scope">
          {{ scope.row.isEnabled === 1 ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{row, $index}">
          <el-popconfirm title="确认禁用该用户？" @confirm="handleDisableUser(row.id, $index)">
            <template #reference>
              <el-button type="text" :loading="loadingForbid">禁用</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
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
    <add-dialog v-model="openAdd" @added="pagination.currentPage = 1"/>
  </div>
</template>
<script>
import AddDialog from "./AddDialog.vue";
import {forbidUser, queryUsers} from "@/api/index.js";

export default {
  name: "Users",
  components: {AddDialog},
  data() {
    return {
      loading: false,
      loadingForbid: false,
      openAdd: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData: []
    }
  },
  watch: {
    'pagination.currentPage'() {
      this.queryUsers()
    },
    'pagination.pageSize'() {
      this.queryUsers()
    }
  },
  methods: {
    async handleDisableUser(id, i) {
      this.loadingForbid = true
      try {
        await forbidUser(id)
        this.tableData[i].isEnabled = 2
      } finally {
        this.loadingForbid = false
      }
    },
    async queryUsers() {
      this.loading = true
      try {
        const data = await queryUsers(this.pagination.currentPage, this.pagination.pageSize)
        this.tableData = data.content
        this.pagination.total = data.totalElements
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
