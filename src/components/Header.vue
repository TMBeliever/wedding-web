<template>
    <div class="header">
      <div class="left">
        <a href="test.html" class="logo"><img src="../assets/logo.png"></a>
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
        <div class="auto" v-if="show">
          <a href="auth.html" >注册</a>
          <a href="auth.html" >登录</a>
        </div>

      </div>


    </div>
</template>

<script>
import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu.vue";

export default {
  components: {ElSubmenu},
  name:'header',
  data(){
    return {
      place:'广西省',
    }
  },
  props:{
    show: {
      type: String
    }
  },
  methods:{
    handleCommand(command) {
      this.place = command;
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .header
    /*background-color aqua*/
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

</style>
