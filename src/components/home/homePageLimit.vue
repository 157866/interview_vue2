<template>
  <div>
    <div class="block">
      <el-table :data="limitData.data" border style="width: 100%">
        <!-- <el-table-column fixed prop="infoId" label="iid" width="200">
        </el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column fixed prop="infoType" label="类型" width="300">
        </el-table-column>

        <el-table-column prop="infoMessage" label="密码" width="300">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
        <!--  total 总共的条数 -->
      </el-pagination>
    </div>
    <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
  </div>
</template>

<script>
export default {
  name: "InterviewHomePageLimit",

  data() {
    return {
      currentPage: 1, //默认起始页
      pageCount: 5, //表示每页的条数
      pageNumber: 1, //表示当前多少页
      pageBegin: 0, //往后端传表示从第几条开始
      limitData: null,
      total: 100,
    };
  },

  mounted() {
    console.log("uid = " + localStorage.getItem("uid"));
    // 三元运算
    let uid =
      this.$store.state.uid === null
        ? localStorage.getItem("uid")
        : this.$store.state.uid;
    if (uid != null) {
      // 分页查询
      this.$api.userInfoApi
        .selectLimitUserInfo(uid, this.pageBegin, this.pageCount)
        .then((res) => {
          console.log(res);
          this.limitData = res.data;
        });
      // 查询数据库的条数 我们比上面的分页查询先执行
      this.$api.userInfoApi.selectUserInfoCount(uid).then((res) => {
        console.log(res);
        this.total = res.data.data;
      });
    }
  },

  methods: {
    handleSizeChange(val) {
      this.pageBegin = this.pageNumber == 1 ? 0 : this.pageNumber * val - val;
      this.pageCount = val;
      // 三元运算
      let uid =
        this.$store.state.uid === null
          ? localStorage.getItem("uid")
          : this.$store.state.uid;
      // 发送Ajax请求
      this.$api.userInfoApi
        .selectLimitUserInfo(uid, this.pageBegin, this.pageCount)
        .then((res) => {
          console.log(res);
          this.limitData = res.data;
        });
      console.log(`每页 ${val} 条`);
    },
    // 获取页数方法
    handleCurrentChange(val) {
      this.pageBegin = val == 1 ? 0 : this.pageCount * val - this.pageCount;
      this.pageNumber = val;
      // 三元运算 如果state为空 则返回loaclStorage里面的
      let uid =
        this.$store.state.uid === null
          ? localStorage.getItem("uid")
          : this.$store.state.uid;
      // 发送ajax请求
      this.$api.userInfoApi
        .selectLimitUserInfo(uid, this.pageBegin, this.pageCount)
        .then((res) => {
          console.log(res);
          this.limitData = res.data;
        });

      console.log(`当前页: ${val}`);
    },
    // 取消多选框
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除

    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(index, row.infoId);
          this.$api.userInfoApi.deleteByInfoId(row.infoId).then((res) => {
            console.log(res);
            this.limitData.data.splice(index, 1);
          }),
            this.$message({
              type: "success",
              message: "删除成功!",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      //   this.$api.myDiaryApi.deleteByUid(row.did).then((res) => {
      //   console.log(res);
      // }),
    },
  },
};
</script>

<style lang="css" scoped>
.block {
  margin-left: 10%;
}
@import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
</style>