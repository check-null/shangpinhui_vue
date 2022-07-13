<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/header";
import Footer from "./components/footer";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch("categoryList");
    this.$router.push('home')
  },
};
</script>

<style></style>
