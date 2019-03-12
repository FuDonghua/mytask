<template>
  <div class="article">
    <div class="search">
      <form class="form">
        发布时间<input class="timeStart" type="date" v-model="timeStart">
        - <input class="timeEnd" type="date" v-model="timeEnd">
        类型<select class="typeIn" v-model="typeIn">
          <option v-for="item in typeList" :key="item.id" :value="item.id">
            {{item.label}}
          </option>
        </select>
        状态<select class="statusIn" v-model="statusIn">
          <option v-for="item in statusList" :key="item.id" :value="item.id">
            {{item.label}}
          </option>
        </select>
      </form>
      <button @click="empty">清空</button>
      <button @click="search">搜索</button>
    </div>
    <div class="list">
      <div class="list-head">
        <button class="add" @click="personal()">+新增</button>
      </div>
      <div class="list-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>图片</th>
              <th>名称</th>
              <th>类型</th>
              <th>发布时间</th>
              <th>修改时间</th>
              <th>发布者</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in articleList" :key="index">
            <tr class="articleChild">
              <th>{{index|indexFilter}}</th>
              <th><img class="img" :src="item.img" alt="图片破损"></th>
              <th>{{item.title}}</th>
              <th>{{item.type|typeFilter}}</th>
              <th>{{item.createAt|timeFilter}}</th>
              <th>{{item.updateAt|timeFilter}}</th>
              <th>{{item.author}}</th>
              <th>{{item.status|statusFilter}}</th>
              <th>
                <a class="changed" @click="updateStatus(item.id,item.status)">{{item.status|updateStatus}}</a>
                <a class="changed" @click="edit(item.id)">编辑</a>
                <a class="changed" @click="Delete(item.id)">删除</a>
              </th>
            </tr>
          </tbody>
        </table>
        <nav class="navigation">
          <ul class="pagination">
            <span>共{{pages}}页</span>
            <button class="startPage" @click="first" :disabled="page==1" :class="{active:page==1}">首页</button>
            <button class="Previous" @click="prev" :disabled="this.page==1"> ＜ </button>
            <!-- <a href="javascript:void(0);" class="nowStyle"> {{ page }}</a> -->
            <button v-if="page>5" disabled>...</button>
            <div v-for="n in pages" :key='n.id'>
              <button v-if="pageShow-1<n&&n<pageShow+5" @click="goPage(n)" :class="{active:activeName==n}">{{n}}</button>
            </div>
            <button v-if="page<pages-4" disabled>...</button>
            <button class="Next" v-on:click="next" :disabled="page==pages">＞</button>
            <button class="endPage" v-on:click="last" :disabled="page==pages" :class="{active:page==pages}">尾页</button>
            <input type="text" class="pageinput" ref="pageinput" @keyup.enter="press" size="2" maxlength="2" oninput="value=value.replace(/[^\d]/g,'')">
            <button @click="press">确定</button>
          </ul>
        </nav>
      </div>
      <div class="footer">
        <ul></ul>
      </div>
    </div>
  </div>
</template>
<script>
  //获取后台列表数据接口
  import {
    articleMenu
  } from "@/http/login/login.js";
  //获取列表具体类型
  import {
    changeArticle,
    typeList,
    jobList,
    statusList
  } from "@/http/article.js";
  export default {
    // name: "article",
    data() {
      return {
        //分页数据
        articleList: [],
        pages: "", //总页数
        //当前页面
        page: 1,
        //传参
        params: "",
        statusIn: "", //状态列表
        typeIn: "", //类型列表
        timeStart: "",
        timeEnd: "",
        fTime: "",
        tTime: "",
        disabled: "",
        searchStatus: "",
        pageShow: 1,
        activeName: "",
        // upDown:""
      };
    },
    //自运行
    created() {
      console.log(this)
      this.typeList = typeList;
      this.statusList = statusList;
      this.searchStatus = JSON.parse(sessionStorage.getItem('setData'));
      console.log(this.searchStatus)
      if (this.searchStatus != null) {
        this.page = this.searchStatus.page
        console.log(this.searchStatus.createAt)
        console.log(this.gotime(this.searchStatus.createAt))
        this.timeStart = this.gotime(this.searchStatus.createAt)
        this.timeEnd = this.gotime(this.searchStatus.updateAt)
        this.typeIn = this.searchStatus.type
        this.statusIn = this.searchStatus.status
      }
      this.menuList()
      this.activeName = this.page //变色按钮
    },
    //过滤器
    filters: {
      indexFilter: function (index) {
        return index + 1;
      },
      typeFilter: function (type) {
        if (type == 0) {
          return '首页banner';
        } else if (type == 1) {
          return "找职位banner";
        } else if (type == 2) {
          return "找精英banner";
        } else if (type == 3) {
          return "行业大图";
        }
      },
      statusFilter: function (status) {
        if (status == 1) {
          return '草稿';
        } else if (status == 2) {
          return '上线';
        }
      },
      updateStatus: function (status) {
        if (status == 1) {
          return "上线";
        } else if (status == 2) {
          return "下线";
        }
      },
      //时间戳转化为时间点
      timeFilter: function (status) {
        let date = new Date(status); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
    },
    methods: {
      gotime(status){
        let date = new Date(status); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        // let h = date.getHours();
        // h = h < 10 ? ('0' + h) : h;
        // let m = date.getMinutes();
        // m = m < 10 ? ('0' + m) : m;
        // let s = date.getSeconds();
        // s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d ;
      },
      menuList() {
        if (this.searchStatus != null) {
          this.params = this.searchStatus
        } else {
          this.params = {
            page: this.page
          }
        }
        console.log(this.params)
        articleMenu(this.params)
          .then(res => {
            console.log(res)
            this.articleList = res.data.data.articleList;
            console.log(this.articleList)
            // 页面加载时获取页数
            let size = +res.data.data.size;
            let total = +res.data.data.total;
            this.pages = Math.ceil(total / size); //算出总页数
            console.log(this.pages)
            this.countNumber()
          });
        console.log(this.pages)
      },
      //按钮数量
      countNumber() {
        this.pageShow = (this.pages > this.page + 4) ? this.page : this.pages - 4
      },
      // 清空缓存和返回初始数据
      empty() {
        this.statusIn = "" //状态列表
        this.typeIn = "" //类型列表
        this.timeStart = ""
        this.timeEnd = ""
        this.page = 1
        this.activeName = "" //按钮变色
        sessionStorage.clear()
        this.params = {
          page: this.page
        }
        articleMenu(this.params)
          .then(res => {
            console.log(res)
            this.articleList = res.data.data.articleList;
            console.log(this.articleList)
            // 页面加载时获取页数
            let size = +res.data.data.size;
            let total = +res.data.data.total;
            this.pages = Math.ceil(total / size); //算出总页数
            this.countNumber()
          });
      },
      //搜索按钮，不与其他按钮联动
      search() {
        //时间转换为时间戳
        if (this.timeStart != undefined || this.timeStart != null) {
          let b = new Date(this.timeStart);
          this.fTime = b.getTime(b);
        }
        if (this.timeEnd != undefined || this.timeEnd != null) {
          let b = new Date(this.timeEnd);
          this.tTime = b.getTime(b);
        }
        this.page = 1
        this.activeName=this.page
        this.params = {
          page: this.page,
          createAt: this.fTime,
          updateAt: this.tTime,
          type: this.typeIn,
          status: this.statusIn
        }
        console.log(this.params)
        articleMenu(this.params)
          .then(res => {
            console.log(res)
            this.articleList = res.data.data.articleList
            // 页面加载时获取页数
            let size = +res.data.data.size;
            let total = +res.data.data.total;
            this.pages = Math.ceil(total / size); //算出总页数
            console.log(size)
            console.log(total)
            console.log(this.pages)
          })
        sessionStorage.setItem('setData', JSON.stringify(this.params))
        console.log(this.page)
      },
      personal() {
        this.$router.push({
          path: "/home/personal"
        })
      },
      // 回车跳转
      press() {
        if (this.$refs.pageinput.value <= this.pages) {
          this.page = Number(this.$refs.pageinput.value)
          this.searchs()
        }
      },
      //页码按钮跳转
      goPage(pageCount) {
        this.page = pageCount
        this.searchs()
      },
      // 首页
      first() {
        this.page = 1
        this.searchs()
      },
      // 尾页
      last() {
        this.page = this.pages
        this.searchs()
      },
      // 上一页
      prev() {
        this.page = this.page - 1 < 1 ? 1 : this.page - 1
        this.searchs()
      },
      // 下一页
      next() {
        this.page = parseInt(this.page) + 1 > this.pages ? this.pages : parseInt(this.page) + 1
        console.log(this.page);
        this.searchs()
      },
      //搜索函数，与其他按钮联动使用
      searchs() {
        this.activeName = this.page //按钮变色
        this.countNumber() //按钮数量
        this.searchStatus = JSON.parse(sessionStorage.getItem('setData'))
        if (this.searchStatus != null) {
          this.searchStatus.page = this.page
        } else {
          this.searchStatus = {
            page: this.page
          }
        }
        this.params = this.searchStatus
        console.log(this.params);
        articleMenu(this.params)
          .then(res => {
            console.log(res)
            this.articleList = res.data.data.articleList;
            console.log(this.articleList)
          })
        sessionStorage.setItem('setData', JSON.stringify(this.params))
      },
      // 上下线请求
      upDown(id, status) {
        console.log(status)
        status = (status == 1) ? 2 : 1
        let params = {
          id,
          status
        };
        console.log(params)
        changeArticle.putStatus(params)
          .then(res => {
            if (params.status == 2) {
              alert("上线操作成功")
            } else if (params.status == 1) {
              alert("下线操作成功")
            }
            this.menuList()
          })
          .catch(error => {
            if (params.status == 2) {
              alert("上线操作失败，服务器爆炸")
            } else if (params.status == 1) {
              alert("下线操作失败，服务器爆炸")
            }
          })
      },
      //上下线修改
      updateStatus(id, status) {
        if (status == 1) {
          if (confirm("是否执行上线操作")) {
            this.upDown(id, status)
          }
        } else if (status == 2) {
          if (confirm("是否执行下线操作")) {
            this.upDown(id, status)
          }
        }
      },
      //编辑
      edit(id) {
        sessionStorage.clear(); //清除所有数据
        this.$router.push({
          path: "/home/personal",
          query: {
            title: "edit",
            id: id
          }
        })
      },
      //删除
      Delete(id) {
        if (confirm("确认删除么")) {
          console.log(id)
          changeArticle.deleteData(id)
            .then(res => {
              alert("删除成功")
              this.menuList()
            })
            .catch(error => {
              alert("删除失败，服务器炸了")
            })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pagination {
    display: flex;
  }

  .changed {
    color: #337ab7;

    &:hover {
      color: red;
    }
  }

  .active {
    background-color: green;
    color: white;
  }

  .img {
    width: 50px;
    height: 50px;
  }
</style>