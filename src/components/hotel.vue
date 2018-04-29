<template>
  <div class="case">
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple">
        <div class="case-info">
          <a :href="'hotelDetail.html#/hotel/'+(hotelData[0].id)"><img :src="hotelData[0].img"></a>
          <h2>¥11111</h2>
          <p>{{hotelData[0].name}}</p>
        </div>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"><div class="case-info">
        <a :href="'hotelDetail.html#/hotel/'+(hotelData[1].id)"><img :src="hotelData[1].img"></a>
        <h2>¥2123</h2>
        <p>{{hotelData[1].name}}</p>
      </div></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"><div class="case-info">
      <a :href="'hotelDetail.html#/hotel/'+(hotelData[2].id)"><img :src="hotelData[2].img"></a>
      <h2>¥21238</h2>
      <p>{{hotelData[2].name}}</p>
    </div></div></el-col>
      <!--<el-col :span="6"><div class="grid-content bg-purple"><div class="case-info">-->
        <!--<a :href="'hotelDetail.html#/hotel/'+(hotelData[3].id)"><img :src="hotelData[3].img"></a>-->
        <!--<h2>¥23888</h2>-->
        <!--<p>{{hotelData[3].name}}</p>-->
      <!--</div></div></el-col>-->
    </el-row>
  </div>
</template>

<script>
  export default {
    props:{
      hotelData:{
        type: Array,
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .case
    .case-info
      width 100%
      margin 0 16px 20px 0
      color rgb(70, 70, 70)
      a
        img
          width 283px
          height 200px
      h2
        color #4EC2BD
      p
        margin-top -10px
        font-weight 300
        font-size 16px
</style>
