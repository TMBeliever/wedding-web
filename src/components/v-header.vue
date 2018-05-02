<template>
    <div class="header">
      <div class="left" v-if="searchShow">
        <a href="index.html" class="logo"><img src="../assets/logo.png"></a>
        <a href="caseDetail.html#all" target="_blank" class="case">婚庆案例</a>
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
        <el-dropdown class="two" @command="roleCommand">
  <span class="el-dropdown-link">
    婚礼团队<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown" show-timeout="150" 	>
            <el-dropdown-item command="planner" >策划师</el-dropdown-item>
            <el-dropdown-item command="photographer">摄影师</el-dropdown-item>
            <el-dropdown-item command="host">主持人</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right" v-if="searchShow">
        <span><i class="el-icon-search"  @click="change"></i></span>
        <div class="me" v-if="show">
          <a href="me.html" style="display: inline-block">{{email}},</a>
          <p style="display: inline-block;cursor: pointer" @click="logout">退出</p>
        </div>
        <div class="auto" v-else>
          <a href="auth.html" >登录</a>
        </div>
      </div>
      <div class="search" v-if="!searchShow">
        <span><i class="el-icon-search"></i></span>
           <span class="select">
             <el-dropdown @command="searchCommand">
            <span class="el-dropdown-link">
                {{searchName}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                  <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="案例">案例</el-dropdown-item>
                <el-dropdown-item command="职业人">职业人</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown></span>
        <span class="input">
          <input v-model="form" :placeholder='placeholder' @keyup.13="keyDown"  style="border: none;height: 25px;width: 600px" autofocus="autofocus">
        </span>
        <span><i class="el-icon-close" @click="change"></i></span>
        </div>
      </div>
</template>

<script>
import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu.vue";
import axios from 'axios'
//import '@/comment/stylus/comment.styl'
export default {
  components: {ElSubmenu},
  name:'header',
  data(){
    return {
      show:Boolean,
      searchShow:true,
      email:'',
      place:'广西省',
      searchName:'案例',
      placeholder:'请输入主题',
      urlFlag:0,
      form:'',
      headers:{
        'Authorization':localStorage.getItem(localStorage.email)
      }
    }
  },
  methods:{
    handleCommand(command) {
      this.place = command;
    },
    roleCommand(command){
      let URL = 'roleDetail.html#/'+command
      window.open(URL)
    },
    searchCommand(command){
      this.searchName = command;
      if(command=='案例'){
        this.placeholder = '请输入主题'
      }
      else{
        this.placeholder = '邮箱/电话/姓名'
      }
    },
    change(){
      this.searchShow = !this.searchShow
    },
    keyDown(event){
      if(event.keyCode == 13){
        localStorage.setItem('search',this.form.trim().split(' ')[0])
        this.form=''
        if(this.searchName=='案例'){
          if(localStorage.getItem('search')==''){
            window.open('caseDetail.html#all')
          }
          else{
            window.open('caseDetail.html#' + localStorage.getItem('search'))}
        }
        else{
          if(localStorage.getItem('search')==''){
            window.open('roleDetail.html#all')
          }
          else{
            window.open('roleDetail.html#/search/' + localStorage.getItem('search'))
        }
        }
      }
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

      .el-icon-search
        font-size 20px
        color #464646
        position relative
        bottom 45px
        left 600px
        cursor pointer
    .search
      margin 12px 300px
      .el-icon-search
        font-size 20px
        color #464646
        margin-top 8px
      .select
        cursor pointer
        z-index 999
        .el-dropdown
          font-size 15px
      .input
        position absolute
        left 400px
        display inline-block
        width 600px
        top 19px
      .el-icon-close
        cursor pointer
        position absolute
        font-size 20px
        left 990px
        top 23px

</style>
