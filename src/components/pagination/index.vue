<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <div style="display: inline-block">
        <button
          class="prev"
          :disabled="pageNo < 2"
          @click="$emit('getPageNo', pageNo - 1)"
          :class="{ disabled: pageNo < 2 }"
          type="button"
        >
          «上一页
        </button>
        <!-- 第一页 -->
        <button
          v-show="startNumAndEndNum.start > 1"
          :class="{ active: pageNo == 1 }"
          @click="$emit('getPageNo', 1)"
          type="button"
        >
          1
        </button>
        <div class="dotted" v-show="startNumAndEndNum.start > 2">...</div>
        <!-- 中间页码 -->
        <button
          type="button"
          v-for="(page, index) in startNumAndEndNum.end"
          :key="index"
          v-show="page >= startNumAndEndNum.start"
          :class="{ active: pageNo == page }"
          @click="$emit('getPageNo', page)"
        >
          {{ page }}
        </button>
        <div class="dotted" v-show="startNumAndEndNum.end < totalPage - 1">
          ...
        </div>
        <!-- 最后一页 -->
        <button
          v-show="startNumAndEndNum.end < totalPage"
          :class="{ active: pageNo == totalPage }"
          @click="$emit('getPageNo', totalPage)"
          type="button"
        >
          {{ totalPage }}
        </button>
        <button
          :disabled="pageNo == totalPage"
          @click="$emit('getPageNo', pageNo + 1)"
          :class="{ disabled: pageNo >= totalPage }"
          type="button"
        >
          下一页»
        </button>
      </div>
      <div style="line-height: 38px" class="total">共{{ total }}条</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';

export default {
  name: "pagination",
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    // 这里存放数据
    return {};
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      //先定义两个变量存储起始数字与结束数字
      let start = 0;
      let end = 0;
      //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】
      //不正常现象【总页数没有连续页码多】
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象【连续页码5，但是你的总页数一定是大于5的】
        //起始数字
        start = pageNo - parseInt(continues / 2);
        //结束数字
        end = pageNo + parseInt(continues / 2);
        //把出现不正常的现象【start数字出现0|负数】纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //把出现不正常的现象[end数字大于总页码]纠正
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  beforeCreate() {}, // 生命周期-创建之前
  created() {}, // 生命周期-创建完成（可以访问当前this实例）
  beforeMount() {}, // 生命周期-挂载之前
  mounted() {}, // 生命周期-挂载完成（可以访问DOM元素）
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, // 生命周期-更新之前
  updated() {}, // 生命周期-更新之后
  beforeDestroy() {}, // 生命周期-销毁之前
  destroyed() {}, // 生命周期-销毁完成
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 66px;
  overflow: hidden;
  float: right;

  .sui-pagination {
    margin: 18px auto;
    vertical-align: middle;
    max-width: 700px;

    button {
      line-height: 18px;
      cursor: pointer;
      position: relative;
      line-height: 18px;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #e0e9ee;
      // margin-left: -1px;
      font-size: 14px;
      padding: 9px 18px;
      color: #333;
    }

    .active {
      background-color: #fff;
      color: #e1251b;
      border-color: #fff;
      cursor: not-allowed;
    }

    .prev {
      background-color: #fff;
    }

    .disabled {
      color: #999;
      cursor: not-allowed;
    }

    .dotted {
      display: inline-block;
      // margin-left: -1px;
      position: relative;
      line-height: 22px;
      text-decoration: none;
      background-color: #fff;
      font-size: 14px;
      border: 0;
      padding: 9px 18px;
      color: #333;
    }

    .next {
      background-color: #fafafa;
    }

    .total {
      color: #333;
      font-size: 14px;
      margin-left: 10px;
      display: inline-block;
    }
  }
}
</style>