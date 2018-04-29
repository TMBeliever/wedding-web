<template>
    <div class="all">
      <div class="content" v-if="dataFlag">
        <p class="title">所有酒店</p>
        <div class="hotel" v-for="(hotel,index) in data" v-if="index<=maxPages&&index>=minPages">
          <a :href="'hotelDetail.html#/hotel/'+(hotel.id)"><img :src="hotel.img" ></a>
          <p class="name">{{hotel.name}}</p>
          <p v-for="(menu,index) in hotel.menu" v-if="index<1">餐标  <span style="color: #4EC2BD">¥{{menu.price}}</span></p>
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
      <v-footer v-if="this.dataFlag"></v-footer>
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
        dataFlag:false,
        minPages:0,
        maxPages:20,
      }
    },
  created(){
    axios({
      method:'get',
      url: 'http://localhost/blog/public/api/hotel/allHotel',
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
    methods:{
     change(event){
       this.minPages = (event-1)*21
       this.maxPages = event*20
       document.body.scrollTop = 0
       document.documentElement.scrollTop = 0
     }
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .content
    width 1050px
    margin 90px auto
    .title
      font-size 17px
      margin-left 14px
      line-height 17px
    .hotel
      width 333px
      float left
      margin-left  15px
      margin-bottom 8px
      img
        width 100%
        height 222px
  &:after
    content '.'
    visibility hidden
    height 0
    line-height 0
    display block
    clear both
  .block
    width 1200px
    .el-pagination
      float right
      margin-top -80px
</style>
