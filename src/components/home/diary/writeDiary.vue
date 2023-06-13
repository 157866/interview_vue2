<template>
  <div>
    <el-input v-model="input" placeholder="请输入标题"></el-input>

    <div style="margin: 20px 0"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 50, maxRows: 4 }"
      placeholder="请输入日记内容"
      v-model="textarea"
    >
    </el-input>
    <el-button type="danger" @click="clear()">清空</el-button>
    <el-button type="primary" @click="save()">保存</el-button>
    <el-button type="primary" @click="cancel()">取消</el-button>
  </div>
</template>

<script>
export default {
  name: "InterviewWriteDiary",

  data() {
    return {
      input: null,
      textarea: null,
      data: null,
      did: null,
    };
  },

  mounted() {
    this.input = this.$route.query.dtitle;
    this.textarea = this.$route.query.diary;
    this.did = this.$route.query.did;
  },

  methods: {
    clear() {
      (this.input = null), (this.textarea = null);
    },
    // 保存
    save() {
      if (this.input != null && this.textarea != null) {
        // 三元运算
        let uid =
          this.$store.state.uid === null
            ? localStorage.getItem("uid")
            : this.$store.state.uid;
        this.$api.myDiaryApi
          .saveDiary(this.did, uid, this.input, this.textarea)
          .then((res) => {
            console.log(res);
            this.$alert("保存成功", {
              confirmButtonText: "确定",
            });
            this.$router.go(-1);
          })
          .catch((err) => {
            console.log(err);
            this.$alert("保存失败", {
              confirmButtonText: "确定",
            });
          });
      }
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="css" scoped>
@import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
</style>