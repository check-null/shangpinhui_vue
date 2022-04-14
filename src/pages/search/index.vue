<template>
  <div>
    <!-- 商品分类三级列表 -->
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCateName">x</i>
            </li>
            <!--关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!--品牌的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">x</i>
            </li>
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <searchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive('1') }" @click="change(1)">
                  <a>
                    综合
                    <i
                      v-show="isActive('1')"
                      class="iconfont"
                      :class="{ 'icon-Up-': isAsc, 'icon-down': isDesc }"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: isActive('2') }" @click="change(2)">
                  <a>
                    销量
                    <i
                      v-show="isActive('2')"
                      class="iconfont"
                      :class="{ 'icon-Up-': isAsc, 'icon-down': isDesc }"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <span>{{ good.price }}.00</span>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      :title="good.title"
                      v-html="good.title"
                    ></a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchParams.total"
            :continues="searchParams.continues"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchSelector from "./searchSelector/searchSelector";
import pagination from "@/components/pagination";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:asc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 3,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
        pageNo: 1,
        pageSize: 3,
        total: 91,
        continues: 5,
      },
    };
  },
  components: {
    searchSelector,
    pagination,
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch: {
    $route(oldValue, newValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getSearchList();
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
  beforeMount() {
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类的名字
    removeCateName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchList();
    },
    //删除关键字
    removeKeyword() {
      //给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getSearchList();
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      //进行路由的跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //自定义事件回调
    trademarkInfo(trademark) {
      console.log("trademark", trademark);
      //1:整理品牌字段的参数  "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getSearchList();
    },
    //删除品牌的信息
    removeTradeMark() {
      //将品牌信息置空
      this.searchParams.trademark = undefined;
      //再次发请求
      this.getSearchList();
    },
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(props) < 0) {
        this.searchParams.props.push(props);
        this.getSearchList();
      }
    },
    removeAttr(index) {
      //再次整理参数
      this.searchParams.props.splice(index, 1);
      //再次发请求
      this.getSearchList();
    },
    isActive(index) {
      return this.searchParams.order.indexOf(index) !== -1;
    },
    change(index) {
      let order = this.searchParams.order.split(":");
      let i = order[0];
      let newOrder;
      if (i == index) {
        newOrder = order[1] == "desc" ? "asc" : "desc";
      } else {
        newOrder = "desc";
      }
      this.searchParams.order = `${index}:${newOrder}`;
      this.isActive(index);
      this.getSearchList();
    },
    getPageNo(page) {
      this.searchParams.pageNo = page;
      this.getSearchList();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>