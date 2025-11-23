<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view> <!-- 路由组件渲染在这里 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 你的样式 */
nav {
  padding: 20px;
}
nav a {
  font-weight: bold;
  margin-right: 10px;
  text-decoration: none;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>