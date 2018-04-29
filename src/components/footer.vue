<template>
    <div class="footer clearfix">
      <div class="left">
        <a href="index.html">关于找我</a>
        <a href="index.html" >联系找我</a>
        <div class="last"><a href="index.html" >售后服务</a></div>
        <!--<img src="../assets/logo3.png">-->
      </div>
      <div class="phone">
        <p>客服热线</p>
        <p>400-401-402</p>
      </div>
    </div>
</template>
<script>
    export default {}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .clearfix
    display inline-block
    &::before
      display block
      content '.'
      height 0
      line-height 0
      clear both
      visibility hidden
  .footer
    background-color #f5f7f8
    width 100%
    height 110px
    .left
      margin-left 70px
      margin-top 30px
      .last
        margin-top 15px
    a
      text-decoration none
      color #000
      margin-left 8px
    .phone
      position absolute
      right 120px
      margin-top -60px
</style>
