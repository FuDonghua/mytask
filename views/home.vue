<template>
  <div class="home">
    <header>
      <div>萝卜多后台管理系统</div>
      <div>
        <span>管理员</span>
        {{gamer}}
        <span class="out" @click="out()">退出</span>
      </div>
    </header>
    <main>
      <div class="left">
        <ul class="asideMenu">
          <div class="oneMenu" @click="welcome()">欢迎页</div>
          <li v-for="(item,index) in menuList" :key="item.id">
            <div class="oneMenu" @click="showToggle(item,index)">
              <span>{{item.name}}</span>
              <span class="next"></span>
            </div>
            <ul v-show="item.isShow">
              <li v-for="subItem in item.subItems" :key="subItem.id">
                <div
                  class="oneMenuChild"
                  @click="article(subItem.name)"
                  :class="{active: activeName==subItem.name}"
                >{{subItem.name}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      gamer: "",
      // user:"",
      menuList: [
        {
          name: "后台管理",
          isShow: false,
          subItems: [
            {
              name: "账号管理"
            },
            {
              name: "角色管理"
            },
            {
              name: "修改密码"
            },
            {
              name: "模块管理"
            }
          ]
        },
        {
          name: "信息管理",
          isShow: false,
          subItems: [
            {
              name: "公司信息"
            },
            {
              name: "职位信息"
            }
          ]
        },
        {
          name: "内容管理",
          isShow: false,
          subItems: [
            {
              name: "Article管理"
            }
          ]
        }
      ],
      activeName: ""
    };
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    if(user!=null){
      this.gamer = user.name
      }
  },
  methods: {
    welcome() {
      this.$router.push({
        path: "/home/welcome"
      });
    },
    article(name) {
      this.activeName=name;
      if (this.index1 == 2) {
        this.$router.push({
          path: "/home/article"
        }); //跳转欢迎页
      }
    },
    out() {
      this.$router.push({
        path: "/"
      });
    },
    //点击展开折叠菜单事件
    showToggle(item, index) {
      console.log(index);
      this.index1 = index; //传值到上面
      this.menuList.forEach(i => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isbShow属性那么menuList[i]等于false
        if (i.isShow !== this.menuList[index].isShow) {
          i.isShow = false;
        }
      });
      console.log(item.isShow);
      item.isShow = !item.isShow; //取反
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  line-height: 1rem;
  border: 0.01rem solid black;
  background-color: #ee7700;
  font-size: 0.25rem;
  color: white;

  p {
    font-weight: bolder;
  }

  span {
    font-size: 0.2rem;
  }

  .out {
    border-bottom: 0.01rem solid white;
  }
}

main {
  display: flex;
  height: 100vh;

  .left {
    position: relative;
    width: 20%;
    font-size: 0.2rem;
    background-color: gold;
    color: white;

    div {
      border-collapse: collapse;
    }

    .asideMenu {
      width: 80%;
      margin: 0.1rem auto;
      
      ul{.active {
        background-color: green;
        color: white;
      }}

      .oneMenu {
        border: 0.01rem solid white;
        margin-bottom: -0.01rem;

        .next {
          position: relative;
          top: 0.15rem;
          left: 0.2rem;
          width: 0;
          height: 0;
          border: 0.07rem solid transparent;
          border-top: 0.1rem solid #ffffff;
        }
      }

      .oneMenuChild {
        border: 0.01rem solid white;
        color: black;
        background-color: #f1f1f1;
      }
    }
  }

  .right {
    width: 100%;
    background-color: #f0fff0;
  }
}
</style>