<template>
  <div class="p-8">
    <div class="text-right">
      <el-button type="primary" @click="this.openAdd = true">新增库存</el-button>
    </div>
    <el-table :data="listData" stripe style="width: 100%" max-height="600" v-loading="loading">
      <el-table-column prop="modelCode" label="型号"/>
      <el-table-column prop="modelName" label="简称"/>
      <el-table-column prop="modelUsage" label="用途"/>
      <el-table-column prop="enterNumber" label="入库数量"/>
      <el-table-column prop="outNumber" label="出库数量"/>
      <el-table-column prop="totalNumber" label="库存"/>
      <el-table-column prop="prices" label="单价"/>
      <el-table-column prop="totalPrices" label="总价"/>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip/>
      <el-table-column prop="createdBy" label="创建人"/>
      <el-table-column prop="createdTime" label="创建时间"/>
      <el-table-column prop="updatedBy" label="更新人"/>
      <el-table-column prop="updatedTime" label="更新时间"/>
      <el-table-column width="140">
        <template #header>
          <el-input v-model="searchModelCode" size="small" placeholder="搜索型号"/>
        </template>
        <template #default="{row}">
          <el-button-group>
            <el-button type="text" @click="this.openDetailId = row.id">明细</el-button>
            <EnterNumberPopover :id="row.id" :model-code="row.modelCode" :model-name="row.modelCode"
                                @updated="queryInventoryList"/>
            <OutNumberPopover :id="row.id" :model-code="row.modelCode" :model-name="row.modelCode"
                              @updated="queryInventoryList"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="justify-end mt-4"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[20, 50, 100]"
        :disabled="disabled"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="size => pagination.pageSize = size"
        @current-change="page => pagination.currentPage = page"
    />
    <add-dialog v-model="openAdd" @added="handleAddedProduct"/>
    <detail-dialog v-model="openDetail" :id="openDetailId"/>
  </div>
</template>

<script>
import AddDialog from "@/views/Home/InventoryList/AddDialog.vue";
import DetailDialog from "@/views/Home/InventoryList/DetailDialog.vue";
import EnterNumberPopover from "@/views/Home/InventoryList/EnterNumberPopover.vue";
import OutNumberPopover from "@/views/Home/InventoryList/OutNumberPopover.vue";
import {queryInventory} from "@/api/index.js";

export default {
  name: 'InventoryList',
  components: {
    OutNumberPopover,
    EnterNumberPopover,
    AddDialog,
    DetailDialog,
  },
  data() {
    return {
      loading: false,
      openAdd: false,
      openDetailId: null,
      searchModelCode: "",
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      listData: [],
    }
  },
  computed: {
    openDetail() {
      return this.openDetailId !== null;
    }
  },
  watch: {
    searchModelCode() {
      this.queryInventoryList()
    },
    'pagination.currentPage'() {
      this.queryInventoryList()
    },
    'pagination.pageSize'() {
      this.queryInventoryList()
    }
  },
  created() {
    this.queryInventoryList()
  },
  methods: {
    async queryInventoryList() {
      this.loading = true
      try {
        const data = await queryInventory(searchModelCode, this.pagination.currentPage, this.pagination.pageSize)
        this.listData = data.content
        this.pagination.total = data.totalElements
      } finally {
        this.loading = false
      }
    },
    handleAddedProduct() {
      this.pagination.currentPage = 1
      this.searchModelCode = ''
    }
  },
}
</script>
