<template>
  <el-menu
      :default-active="currentTab"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="false"
  >
    <el-menu-item v-for="item in navigations" :index="item.key">
      <RouterLink :to="item.path">{{ item.title }}</RouterLink>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-sub-menu>
      <template #title>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </template>
      <el-menu-item disabled>{{ userInfo.realName }}</el-menu-item>
      <el-menu-item @click="handleLogout">退出</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <RouterView/>
</template>

<script>
import {getUserInfo, logout} from "@/api/index.js";
import {defineComponent} from "vue";
import {mapActions, mapState} from "pinia";
import {useUserInfo} from "@/stores/userInfo.js";

export default defineComponent(
    {
      data() {
        return {
          currentTab: 'inventory-list',
          loading: false,
        }
      },
      computed: {
        ...mapState(useUserInfo, ['userInfo']),
      },
      created() {
        this.navigations = this.$router.resolve({name: 'home'}).matched[0].children.map((item) => ({
          title: item.title,
          key: item.name,
          path: item.path
        }))
        this.getUserInfo()
      },
      mounted() {
        console.log("mount")
      },
      beforeRouteEnter(to, _, next) {
        next(vm => {
          vm.currentTab = to.name
          console.log(vm.currentTab)
        })
      },
      methods: {
        ...mapActions(useUserInfo, ['setUserInfo']),
        async getUserInfo() {
          this.loading = true
          try {
            const userInfo = await getUserInfo()
            this.setUserInfo(userInfo)
          } finally {
            this.loading = false
          }
        },
        async handleLogout() {
          await logout()
          this.$router.push({name: 'login'})
        }
      }
    }
)
</script>
