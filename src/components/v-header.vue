<template>
    <div class="header">
      <div class="left">
        <a href="index.html" class="logo"><img src="../assets/logo.png"></a>
        <a href="register.html" target="_blank" class="case">婚庆案例</a>
        <el-dropdown class="one" @command="handleCommand">
  <span class="el-dropdown-link">
    {{place}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown" show-timeout="150"	>
            <el-dropdown-item command="广西省">广西省</el-dropdown-item>
            <el-dropdown-item command="湖南省" >湖南省</el-dropdown-item>
            <el-dropdown-item command="北京市" >北京市</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="two">
  <span class="el-dropdown-link">
    婚礼团队<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown" show-timeout="150"	>
            <el-dropdown-item command="a" >策划师</el-dropdown-item>
            <el-dropdown-item command="a">摄影师</el-dropdown-item>
            <el-dropdown-item command="a">主持人</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right">
        <div class="me" v-if="show">
          <a href="me.html" style="display: inline-block">{{email}},</a>
          <p style="display: inline-block;cursor: pointer" @click="logout">退出</p>
        </div>
        <div class="auto" v-else>
          <a href="auth.html" >登录</a>
        </div>


      </div>


    </div>
</template>

<script>
import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu.vue";
import axios from 'axios'
export default {
  components: {ElSubmenu},
  name:'header',
  data(){
    return {
      show:Boolean,
      email:'',
      place:'广西省',
      headers:{
        'Authorization':localStorage.getItem(localStorage.email)
      }
    }
  },
  methods:{
    handleCommand(command) {
      this.place = command;
    },
    logout() {
      axios({
        method: 'post',
        url: 'http://localhost/blog/public/api/auth/logout',
        data: {
        }
      })
        .then((res) => {
          localStorage.removeItem(localStorage.email)
          delete localStorage.email
          window.location.href = 'auth.html'
        })
        .catch((err) => {
         if(err.response.status===401){
           localStorage.removeItem(localStorage.email)
           delete localStorage.email
           window.location.href = 'auth.html'
         }
        })
    }
  },
  created(){
    if(localStorage.email){
      this.show = true
      this.email = localStorage.email
    }
    else{
      this.show = false
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .header
    /*background-color aqua*/
    min-width 900px
    position fixed
    top 0
    width 100%
    height 65px
    font-size 14px
    box-shadow 0 0 1px 0 #DAC9A6
    background #fff
    z-index 999
    a
      text-decoration none
      color: rgb(70, 70, 70)
      font-weight 120
    .left
      width 60%
      height 100%
      .logo
        display inline-block
        margin 15px 0 0 90px
      .case
        position absolute
        left 390px
        top 23px
      .one
        position absolute
        top 23px
        left 225px
        cursor pointer
      .two
        position absolute
        top 23px
        left 510px
        cursor pointer
    .right
      .auto
        position absolute
        right 100px
        top 23px
        a:first-child
          padding-right   10px
      .me
        position absolute
        right 100px
        top 13px

</style>
