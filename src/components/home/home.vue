<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <h1>{{ message }}</h1>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="7"
        ><div class="grid-content bg-purple">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="homePageLimit()"
                  >首页</el-menu-item
                >
                <el-menu-item index="1-2" @click="savePassword()"
                  >保存密码</el-menu-item
                >
                <el-menu-item index="1-3" @click="diaryView()"
                  >个人日记</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div></el-col
      >

      <el-col :span="14">
        <div class="grid-content bg-purple-light">
          <router-view name="savePasswordView"></router-view></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import HomePageLimit from "./homePageLimit.vue";

export default {
  name: "InterviewHome",

  data() {
    return {
      message: "个人隐私系统",
    };
  },

  mounted() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    savePassword() {
      this.$router
        .push({
          path: "/home/savePassword",
        })
        .catch((err) => {}); //不抛出这个异常点击同一路路由会报错
    },
    homePageLimit() {
      // 页面跳转
      this.$router
        .push({
          path: "/home/homePageLimit",
        })
        .catch((err) => {}); //不抛出这个异常点击同一路路由会报错
    },
    diaryView() {
      this.$router
        .push({
          path: "/home/HomeDiary",
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="css" scoped>
#leftNav {
  width: 30%;
  display: block;
}
@import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
.savePasswordView {
  border: 1px solid black;
  margin-left: 10%;
  margin-top: 10px;
  display: block;
}
.outrBox {
  display: block;
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>