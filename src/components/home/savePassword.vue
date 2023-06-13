<template>
  <div id="savePasswordBox">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link" split-button="true">
        {{ command }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="QQ密码">QQ密码</el-dropdown-item>
        <el-dropdown-item command="微信密码">微信密码</el-dropdown-item>
        <el-dropdown-item command="农业银行密码">农业银行密码</el-dropdown-item>
        <el-dropdown-item command="商业银行密码">商业银行密码</el-dropdown-item>
        <el-dropdown-item command="工商银行密码">工商银行密码</el-dropdown-item>
        <el-dropdown-item command="学习通密码">学习通密码</el-dropdown-item>
        <el-dropdown-item command="其它">其它</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-input
      class="el_input"
      v-model="input"
      placeholder="请输入需要保存的密码"
    ></el-input>
    <el-button type="primary" class="el_button" @click="savePassword()"
      >保存</el-button
    >
  </div>
</template>

<script>
export default {
  name: "InterviewSavePassword",

  data() {
    return {
      command: "下拉菜单",
      input: "",
    };
  },

  mounted() {},

  methods: {
    handleCommand(command) {
      this.$message("当前选择的是 " + command);
      this.command = command;
      if (this.command == "其它") {
        this.$prompt("请输入你要保存密码的类型", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            (this.command = value),
              this.$message({
                type: "success",
                message: "你的保存类型是: " + value,
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      }
    },
    savePassword() {
      // 三元运算
      let uid =
        this.$store.state.uid === null
          ? localStorage.getItem("uid")
          : this.$store.state.uid;
      this.$api.userInfoApi
        .savePassword(uid, this.command, this.input)
        .then((res) => {
          console.log(res);
          this.$alert("保存成功", {
            confirmButtonText: "确定",
          });
        })
        .catch(function (error) {
          this.$alert("保存失败", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>

<style lang="css" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el_input {
  margin-left: 50px;
  width: 60%;
}
.el_button {
  margin-left: 20px;
  width: 15%;
}
</style>