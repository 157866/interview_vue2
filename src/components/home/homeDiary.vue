<template>
  <div>
    <el-radio v-model="radio" label="1">查看日记</el-radio>
    <el-radio v-model="radio" label="2">写日记</el-radio>
    <router-view name="diaryCheangeView"></router-view>
  </div>
</template>

<script>
export default {
  name: "InterviewHomeDiary",

  data() {
    return {
      radio: null,
    };
  },

  mounted() {},

  methods: {},
  watch: {
    radio: {
      deep: true,
      handler: function (val, oldVal) {
        if (val == 1) {
          console.log("监听到为1");
          this.$router
            .push({
              path: "/home/homeDiary/showDiary",
            })
            .catch((err) => {});
        } else {
          console.log("监听到为2");
          this.$router.push({
            path: "/home/homeDiary/writeDiary",
          });
        }
      },
    },
  },
};
</script>

<style lang="css" scoped>
</style>