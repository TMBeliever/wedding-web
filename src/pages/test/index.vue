<template>
    <div id="app">
      <v-header :show="true"></v-header>
      <div class="banner">
        <div class="title">
          <p id="title">只为期待你的婚礼</p>
          <el-button type="primary" round >我要办婚礼</el-button>
        </div>
      </div>
      <v-content></v-content>
      <v-footer></v-footer>
    </div>
</template>

<script>
import headers from '@/components/v-header'
import footer from '@/components/footer'
import content from '@/components/content'

export default {
  components:{
    'v-header': headers,
    'v-footer': footer,
    'v-content':content,
  }
}

</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .banner
    position relative
    background url("../../assets/content1.jpg")
    background-size: cover
    height 480px
    width 100%
    .title
      position absolute
      top 170px
      left 80px
      color #fff
      font-weight 180
      font-size 43px
      p
        margin-bottom 12px
      .el-button
        background-color #F8C3CD
        border-color #F8C3CD
        transition all .4s
        font-size 16px
        width 150
        height 45px
        &:hover
         transform scale(1.07)

</style>
