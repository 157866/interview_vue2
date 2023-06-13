<template>
  <div>
    <div class="block">
      <el-table
        :data="
          limitData.data.filter(
            (data) =>
              !search ||
              data.dtitle.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="日期" prop="ddate" :formatter="formatData">
        </el-table-column>

        <el-table-column label="标题" prop="dtitle"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
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
  name: "InterviewShowDiary",

  data() {
    return {
      currentPage: 1, //默认起始页
      pageCount: 5, //表示每页的条数
      pageNumber: 1, //表示当前多少页
      pageBegin: 0, //往后端传表示从第几条开始
      limitData: null,
      search: "",
      total: 100,
    };
  },

  mounted() {
    // 三元运算
    let uid =
      this.$store.state.uid === null
        ? localStorage.getItem("uid")
        : this.$store.state.uid;
    console.log("showDiary  uid= " + uid);
    if (uid != null) {
      this.$api.myDiaryApi
        .selectByUidLimit(uid, this.pageBegin, this.pageCount)
        .then((res) => {
          this.limitData = res.data;
          console.log(res);
        });
    }

    // 获取初始条数
    this.$api.myDiaryApi.countDiary(uid).then((res) => {
      console.log("获取初始条数" + res.data);
      this.total = res.data;
    });
  },

  methods: {
    selectByUidApi(pageBegin, pageCount) {
      let uid =
        this.$store.state.uid === null
          ? localStorage.getItem("uid")
          : this.$store.state.uid;
      if (uid != null) {
        this.$api.myDiaryApi
          .selectByUidLimit(uid, pageBegin, pageCount)
          .then((res) => {
            this.limitData = res.data;
            console.log(res);
          });
      }
    },
    // 表格的方法修改
    handleEdit(index, diaryData) {
      console.log(index, diaryData);
      this.$router.push({
        path: "/home/homeDiary/writeDiary",
        query: diaryData,
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.myDiaryApi.deleteByUid(row.did).then((res) => {
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

      console.log(index, row);
    },
    // 分页的方法
    handleSizeChange(val) {
      this.pageBegin = this.pageNumber == 1 ? 0 : this.pageNumber * val - val;
      this.pageCount = val;
      this.selectByUidApi(this.pageBegin, this.pageCount);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageBegin = val == 1 ? 0 : this.pageCount * val - this.pageCount;
      this.pageNumber = val;
      this.selectByUidApi(this.pageBegin, this.pageCount);
      console.log(`当前页: ${val}`);
    },
    // 修改时间格式
    formatData(row, column, cellValue, index) {
      //把传过来的日期进行回炉重造一下，又创建了一个js的 Date对象，进行重新构造，转为String字符串
      //最终返回 s 就可以了
      var s = new Date(cellValue).toLocaleString();
      return s;

      // 测试参数含义：不知道参数是什么含义的就打印出来
      // console.log(row)     	//拿到一行的所有信息，要拿到具体信息,只需要row.XXX 就可以了
      // console.log(column)  	//拿到列的信息
      // console.log(cellValue) //拿到单元格数据，拿到时间 2022-03-18T01:46:08.000+00:00
      // console.log(index)     //拿到索引
    },
  },
};
</script>

<style lang="css" scoped>
</style>