<template>
  <div class="home">
    <el-container>
      <el-header height="118px">
        <el-input v-model="input1" size="large" placeholder="个人的学习网站" :prefix-icon="Search" clearable>
          <template #append>
            <el-button :icon="Search" @click="search" />
          </template>
        </el-input>

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link to="/">Home</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/about">About</router-link>
          </el-menu-item>
          <el-menu-item index="3">3菜单 nn</el-menu-item>
          <el-menu-item index="4">4菜单 dd</el-menu-item>
          <el-sub-menu index="5">
            <template #title>多项菜单</template>
            <el-menu-item index="5-1">item one</el-menu-item>
            <el-menu-item index="5-2">item two</el-menu-item>
            <el-menu-item index="5-3">item three</el-menu-item>
            <el-sub-menu index="5-4">
              <template #title>item four</template>
              <el-menu-item index="5-4-1">item one</el-menu-item>
              <el-menu-item index="5-4-2">item two</el-menu-item>
              <el-menu-item index="5-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-scrollbar height="480px">
            <p v-for="item in count" :key="item" class="scrollbar-demo-item">{{ item }}</p>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar height="450px">
            <autoTextEffectVue></autoTextEffectVue>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import AutoTextEffectVue from '@/components/AutoTextEffect.vue'
export default {
  name: 'HomeView',
  components: { AutoTextEffectVue },
  data() {
    return {
      input1: '',
      Search: Search,
      activeIndex: '1',
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0]
    }
  },
  methods: {
    search() {
      console.log(1)

      // ElMessage({
      //   message: '点击了搜索 ...',
      //   grouping: true,
      //   type: 'success'
      // })
      this.$message({
        message: '点击了搜索 ...',
        grouping: true,
        showClose: true,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home,
.el-container {
  height: 100%;
}

.el-header {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-input {
  width: 400px;
}

.el-menu {
  border: none;
}
router-link,
a {
  text-decoration: none;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
