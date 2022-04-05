<template>
  <div>
    <typeNav />
    <Listcontainer />
    <Commend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import《组件名称》from'《组件路径》';
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Listcontainer: () => import("@/pages/home/listContainer"),
    Commend: () => import("@/pages/home/recommend"),
    Rank: () => import("@/pages/home/rank"),
    Like: () => import("@/pages/home/like"),
    Floor: () => import("@/pages/home/floor"),
    Brand: () => import("@/pages/home/brand"),
  },
  props: {},
  data() {
    //这里存放数据
    return {};
  },
  //计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  beforeCreate() {}, //生命周期-创建之前
  created() {
    this.$store.dispatch("getFloorList");
  }, //生命周期-创建完成（可以访问当前this实例）
  beforeMount() {}, //生命周期-挂载之前
  mounted() {}, //生命周期-挂载完成（可以访问DOM元素）
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, //生命周期-更新之前
  updated() {}, //生命周期-更新之后
  beforeDestroy() {}, //生命周期-销毁之前
  destroyed() {}, //生命周期-销毁完成
  methods: {},
};
</script>

<style lang="less" scoped>
</style>