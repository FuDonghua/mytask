<template>
  <div class="login">
    <div class="enter">后台登入</div>
    <div class="account">
      <div class="phone"></div>
      <div class="number">
        <input type="text" v-model="user" placeholder="用户名" />
      </div>
    </div>
    <div class="locked">
      <div class="lock"></div>
      <div class="pwd">
        <input type="password" v-model="password" placeholder="密码" @keyup.enter="press"/>
      </div>
    </div>
    <div class="remember">{{ msg }}</div>
    <button class="entering" @click="login()"> 登录</button>
  </div>
</template>

<script>
  import {
    postLogin
  } from "@/http/login/login.js"; //登录接口
  export default {
    name: "login",
    data() {
      return {
        user: "",
        password: "",
        msg: ""
      };
    },
    methods: {
      login() {
        //登录请求
        let params = {
          name: this.user,
          pwd: this.password
        };
        //获取数据
        postLogin(params)
          .then(res => {
            console.log(res)
            let code = res.data.code;
            let message = res.data.message;
            console.log("code", code, "message", message);
            let user = {
                name: res.data.data.manager.name, //获取登录用户名
                id: res.data.data.manager.id, //用户id
                status: true //登录状态
              };
              console.log(user)
              sessionStorage.setItem("user", JSON.stringify(user)); //用户信息存储
            if (code == 0) {
              //登录成功
              this.$router.push('/home')
            } else {
              this.msg = message;
            }
          })
      },
       // 回车跳转
      press() {
        var that = this
        that.login()
        
    }
  }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 3rem;
    margin: 4rem auto 0;
    text-align: center;
    background-color: rbga(0, 0, 0, .5);

    .enter {
      padding-top: .1rem;
      font-size: .2rem;
      color: #69D1E9;
    }

    .account {
      height: .4rem;
      width: 80%;
      margin: .1rem 10% .1rem 10%;
      background-color: white;

      .phone {
        width: .3rem;
        height: .2rem;
        margin: .1rem;
        border-right: .01rem solid #BABABA;
        float: left;
      }

      .number {
        width: .1rem;
        height: .16rem;
        margin: .12rem 0 0 .17rem;
        float: left;

        input {
          border: none;
          outline-style: none;
        }
      }
    }

    .locked {
      height: .4rem;
      width: 80%;
      margin: .12rem 10% .1rem 10%;
      background-color: white;

      .lock {
        width: .3rem;
        height: .2rem;
        margin: .1rem;
        border-right: .01rem solid #BABABA;
        float: left;
      }

      .pwd {
        width: .1rem;
        height: .16rem;
        margin: .1rem 0 0 .17rem;
        float: left;

        input {
          border: none;
          outline-style: none;
        }
      }
    }

    .remember {
      height: .28rem;
      font-size: 0.17rem;
      color: red;
    }

    .entering {
      width: 80%;
      height: .3rem;
      margin: 0 10% .1rem;
      font-size: .18rem;
      border: none;
      color: white;
      background-color: #5FC0CD;

      &:hover {
        color: gold;
      }
    }
  }
</style>