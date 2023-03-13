<template>
  <router-view />

  <!-- 回到顶部 -->
  <el-backtop :right="100" :bottom="100" />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#app {
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
</style>
