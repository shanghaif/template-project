<template>
  <div style="background-color: #1465BF;">
    <div class="a1">
      <img src="../../../../imgs/logo.png" alt style=" cursor:pointer;width: 50px; height: 50px; margin: 15px auto;" @click="$router.push('/')"/>
    </div>
    <div>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu unique-opened :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical"
          background-color="#1465BF" text-color="#ffff" active-text-color="#1465BF">
          <sidebar-item v-for="route in this.routes" :key="route.path" :item="route" :base-path="route.path"/>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters(['sidebar']),
      routes() {
        return this.$store.state.permission.routers
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
<style lang="scss" scoped>
  .a1 {
    height: 10vh;
    text-align: center;
    vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .el-scrollbar__wrap{
    height: 90vh!important;
  }

</style>

