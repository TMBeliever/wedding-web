<template>
    <div class="all">
      <div class="content">
        <div class="nav" v-for="(cases,index) in data" v-if="index<=maxPages&&index>=minPages">
          <a :href="'caseDetail.html#/case/'+(cases.id)"><img :src="cases.img.split(',')[0]"></a>
          <div class="first"><span class="title">{{cases.title}}</span><span class="price">¥7840</span></div>
          <div class="second">策划师：{{cases.orders.pl_user.role1.name}}</div>
          <div class="third"> <i class="el-icon-location" style="font-size: 24px"></i> <span>{{cases.orders.hotel.place}}</span></div>
        </div>
      </div>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :page-size ='21'
          :total=data.length @current-change="change">
        </el-pagination>
      </div>
      <v-footer v-if="this.dataFlag" style="background-color: white;margin-top: 70px"></v-footer>
    </div>
</template>

<script>
  import axios from 'axios'
  import footer from '@/components/footer'
export default {
  components:{
      'v-footer':footer
    },

    data(){
      return {
        data:[],
        minPages:0,
        maxPages:19,
        dataFlag:false
      }
    },
  methods:{
    change(event){
      this.minPages = (event-1)*20
      this.maxPages = event*19
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  created(){
    axios({
      method:'get',
      url: 'http://localhost/blog/public/api/case/allCase',
    })
      .then((res)=>{
        if(res.status===200){
          this.data = res.data.data
          this.dataFlag = true
          console.log(this.data)
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    .all
      width 100%
      height 100%
      background-color #F4F4F4
      position relative
      &:after
        content '.'
        visibility hidden
        height 0
        line-height 0
        display block
        clear both
      .content
        width 1200px
        margin 65px auto
        .nav
          background-color #fff
          float left
          width 270px
          margin-right 30px
          margin-top 30px
          img
            width 270px
            height 166px
          .first
            font-size 18px
            margin-top 10px
            .title
              padding-left 10px
              display inline-block
              width 190px
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
            .price
              padding-right 10px
              color #4EC2BD
              font-size 18px
              float right
          .second
            padding-left 10px
            color #979797
            font-size 14px
            margin 10px 0
          .third
            padding-left 10px
            padding-bottom 14px
            color #979797
            span
              font-size 13px
              position relative
              bottom  5px

      .block
        position absolute
        left 50%
        transform translateX(-50%)
        bottom 130px
</style>
