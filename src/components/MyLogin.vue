<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="text-center avatar-box">
        <img src="../assets/logo.png" class="img-thumbnail avatar" alt="" />
      </div>

      <!-- 表单区域 -->
      <div class="form-login p-4">
        <!-- 登录名称 -->
        <div class="form-group form-inline">
          <label for="accountNumber">登录名称</label>
          <input
            type="text"
            class="form-control ml-2"
            id="accountNumber"
            placeholder="请输入登录名称"
            autocomplete="off"
            v-model.trim="accountNumber"
          />
        </div>
        <!-- 登录密码 -->
        <div class="form-group form-inline">
          <label for="upassword">登录密码</label>
          <input
            type="password"
            class="form-control ml-2"
            id="upassword"
            placeholder="请输入登录密码"
            v-model.trim="upassword"
          />
        </div>
        <!-- 登录和重置按钮 -->
        <div class="form-group form-inline d-flex justify-content-end">
          <el-button type="warning" @click="reset">重置</el-button>

          <el-button id="loginButton" type="primary" @click="login"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "MyLogin",
  data() {
    return {
      accountNumber: "123456",
      upassword: "123456",
      userData: null,
    };
  },
  methods: {
    // 封装了应该保存cookie的方式 day为过期天数
    setCookie(name, val, day) {
      //设置时间
      var now = new Date();
      //设置时间 now.getMinutes()  获取当前多少分钟
      now.setMinutes(now.getMinutes() + day * 24 * 60);

      //设置Cookie
      document.cookie = name + "=" + val + ";expires=" + now.toUTCString();
    },
    reset() {
      (this.accountNumber = ""), (this.upassword = "");
    },

    login() {
      let this_ = this;
      this_.$api.userApi
        .Userlogin(this_.accountNumber, this_.upassword)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this_.userData = res.data;
            this_.$store.dispatch("getUserName", this_.userData.data.uname);
            this_.$store.dispatch("SetUserUId", res.data.data.uid);
            // 保存到本地页面
            localStorage.setItem("uid", this_.userData.data.uid);
            // 获取到本地uid的值
            console.log("本地=" + localStorage.getItem("uid"));
            // 保存到cookie
            this_.setCookie("uid", res.data.data.uid, 7);
            const path = this_.$router.query;
            console.log("path =" + path);
            this_.$router.replace({
              path: path == "/" || path == undefined ? "/home" : path,
            });
          }
        })
        .catch(function (error) {
          console.log("错误" + error);
          this_.$alert("账号或者密码错误", {
            confirmButtonText: "确定",
          });
        });
    },
  },
};
</script>
  
  <style lang="less" scoped>
.login-container {
  background-color: #35495e;
  height: 100%;
  .login-box {
    width: 400px;
    height: 250px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
    .form-login {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.form-control {
  flex: 1;
}

.avatar-box {
  position: absolute;
  width: 100%;
  top: -65px;
  left: 0;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50% !important;
    box-shadow: 0 0 6px #efefef;
  }
  #loginButton {
    margin-left: 15%;
  }
}
</style>