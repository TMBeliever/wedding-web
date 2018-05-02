<template>
    <div class="role">
      <div class="content">
        <div class="search">
          <p style="visibility: hidden">aaa</p>
          <div class="content">
            <p style="visibility: hidden;margin: 1px">???</p>
            <div class="price">
              <el-tabs v-model="priceAction" @tab-click="priceClick">
                <el-tab-pane label="不限" name="0,100000000"></el-tab-pane>
                <el-tab-pane label="3000以下" name="0,3000"></el-tab-pane>
                <el-tab-pane label="3000-5000" name="3000,5000"></el-tab-pane>
                <el-tab-pane label="5000-10000" name="5000,10000"></el-tab-pane>
                <el-tab-pane label="10000以上" name="10000,10000000000000"></el-tab-pane>
              </el-tabs>
            </div>
            <!--<div class="type">-->
              <!--<el-tabs v-model="typeAction" @tab-click="typeClick">-->
                <!--<el-tab-pane label="不限" name="0"></el-tab-pane>-->
                <!--<el-tab-pane label="男" name="1"></el-tab-pane>-->
                <!--<el-tab-pane label="女" name="2"></el-tab-pane>-->
              <!--</el-tabs>-->
            <!--</div>-->
          </div>
          <div class="sort">
            <el-tabs v-model="sortAction" @tab-click="sortClick">
              <el-tab-pane label="综合" name="id"></el-tab-pane>
              <el-tab-pane label="价格↑" name="sort" v-if="!showPriceB"></el-tab-pane>
              <el-tab-pane label="价格↓" name="desc" v-if="showPriceB"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="nav" >
          <div class="show" v-for="(role,index) in this.data" v-if="index<5">
          <div class="left">
            <span class="place">
              <i class="el-icon-location-outline"></i>{{role.role1.place}}
            </span>
            <p class="img">
              <a :href="'roleDetail.html#/role/'+role.id">
                <img src="http://image.izhaowo.com/8_0e9c8ed5-8f2a-473f-91e7-0d116980cd4f.jpg@80w_80h_1e_1c_0l">
              </a>
            </p>
            <p class="name">{{role.role1.name}}</p>
            <p class="price">¥ {{role.role1.price}}</p>
            <p class="describe">{{role.role1.describe}}</p>
            <ul class="detail">
              <li>
                <p class="amount">{{role.orderCount}}</p>
                <p class="type">预定量</p>
              </li>
              <li>
                <p class="amount">{{role.commentCount}}</p>
                <p class="type">评论量</p>
              </li>
            </ul>
          </div>
          <div class="middle"  v-if="!(role.host==false)">
            <div class="pl">
              <a :href="'caseDetail.html#/case/'+role.host[0].case1s.id"><img :src="role.host[0].case1s.img.split(',')[0]" >
              </a>
            </div>
          </div>
          <div class="right" v-if="!(role.host==false)" >
              <div class="top">
                <a :href="'caseDetail.html#/case/'+role.host[1].case1s.id"><img :src="role.host[1].case1s.img.split(',')[0]" >
                </a>
              </div>
             <div class="bottom" >
               <a :href="'caseDetail.html#/case/'+role.host[3].case1s.id"><img :src="role.host[3].case1s.img.split(',')[0]" >
               </a>
             </div>
          </div>
            <div class="middle" v-if="!(role.planner==false)">
              <div class="pl">
                <a :href="'caseDetail.html#/case/'+role.planner[0].case1s.id"><img :src="role.planner[0].case1s.img.split(',')[0]" >
                </a>
              </div>
            </div>
            <div class="right" v-if="!(role.planner==false)">
              <div class="top">
                <a :href="'caseDetail.html#/case/'+role.planner[1].case1s.id"><img :src="role.planner[1].case1s.img.split(',')[0]" >
                </a>
              </div>
              <div class="bottom" >
                <a :href="'caseDetail.html#/case/'+role.planner[2].case1s.id"><img :src="role.planner[2].case1s.img.split(',')[0]" >
                </a>
              </div>
            </div>
            <div class="middle" v-if="!(role.photographer==false)">
              <div class="pl">
                <a :href="'caseDetail.html#/case/'+role.photographer[0].case1s.id"><img :src="role.photographer[0].case1s.img.split(',')[0]" >
                </a>
              </div>
            </div>
            <div class="right" v-if="!(role.photographer==false)">
              <div class="top">
                <a :href="'caseDetail.html#/case/'+role.photographer[1].case1s.id"><img :src="role.photographer[1].case1s.img.split(',')[0]" >
                </a>
              </div>
              <div class="bottom">
                <a :href="'caseDetail.html#/case/'+role.photographer[2].case1s.id"></a><img :src="role.photographer[2].case1s.img.split(',')[0]" >
                </a>
              </div>
            </div>
        </div>
        </div>
        <div class="blank" v-if="this.data==false">
          <i class="el-icon-loading"></i>
          <div class="content" v-if="dataFlag">
            没有数据，真是抱歉！
          </div>
        </div>
      </div>
      <v-footer style="background-color: #fff" v-if="dataFlag"></v-footer>
    </div>
</template>

<script>
  import '@/comment/stylus/comment.styl'
  import axios from 'axios'
  import footer from '@/components/footer'
  export default {
    components:{
      'v-footer':footer
    },
    data(){
      return{
//        typeAction: '0',
        priceAction:'0,10000000000000',
        sortAction:'id',
        data:[],
        showData:[],
        showPriceB:false,
        search:'',
        role:0,
        dataFlag:false,
      }
    },
  methods:{
    priceClick(tab, event) {
      this.data = []
      for(let i =0;i<this.showData.length;i++){
        if(parseInt(tab.name.split(',')[0])<parseInt(this.showData[i].role1.price)&&parseInt(this.showData[i].role1.price)<parseInt(tab.name.split(',')[1])){
          this.data.push(this.showData[i])
        }
      }
      this.sortAction ='id'
    },
    sortClick(tab, event) {
      switch (tab.name){
        case 'id':
          this.data.sort((a,b)=>{
            return a.id - b.id
          })
          break
        case 'desc':
          this.data.sort((a,b)=>{
//            console.log(a)
            return a.role1.price - b.role1.price
          })
          this.sortAction = 'sort'
          this.showPriceB = !this.showPriceB
          break
        case 'sort':
          this.data.sort((a,b)=>{
//            console.log(a)
            return b.role1.price  - a.role1.price
          })
          this.sortAction = 'desc'
          this.showPriceB = !this.showPriceB
          break
      }
    },
  },
  created(){
    if(localStorage.getItem('search')) {
      this.search = localStorage.getItem('search')
      localStorage.removeItem('search')
    }
      switch (this.$route.params.id){
        case 'planner':
          this.role = 3
              break
        case 'photographer':
          this.role = 4
          break
        case 'host':
          this.role = 2
          break
      }
    if(this.$route.params.id!=='host'&&this.$route.params.id!=='photographer'&&this.$route.params.id!=='planner'){
        this.role = 0
    }
      axios({
        method:'post',
        url:'http://localhost/blog/public/api/role/allRole',
        data:{
          search:this.search,
          role:this.role
        }
      })
        .then((res)=>{
          this.data = res.data.data
          this.showData =res.data.data
          this.dataFlag  = true
        })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .role
    width 100%
    height 100%
    background-color #F4F4F4
    .content
      width 1200px
      margin 65px auto
      .search
        margin-top 65px
        margin-bottom 100px
        width 1200px
        height 100px
        .content
          margin-top 8px
          width 100%
          background-color #fff
          height 125px
          .type
            width 1080px
            margin-left 40px
            border-bottom 1px dashed #EAEAEA
          .price
            width 1080px
            margin-left 40px
            border-bottom 1px dashed #EAEAEA
        .sort
          position relative
          bottom 34px
      .blank
        width 100%
        height 250px
        background-color #F4F4F4
        .el-icon-loading
          position absolute
          top 500px
          left 540px
          font-size 22px
        .content
          width 200px
          margin 200px auto
    .nav
      width 1200px
      position relative
      margin-top 136px
      background #F4F4F4
      &:after
        content '.'
        visibility hidden
        height 0
        clear both
        display block
      .show
        margin-bottom 14px
        background #fff
        &:after
          content '.'
          visibility hidden
          height 0
          clear both
          display block
        .left
          float left
          width 360px
          position: relative
          p
            text-align center
          .place
            position absolute
            right 12px
            top 10px
            color #cdcdcd
            font-size 13px
          .img
            margin-top 40px
            img
              border-radius 50%
          .name
            font-size 13px
            color #464646
          .price
            color #4EC2BD
            font-size 18px
            font-weight 530px
          .describe
            color rgb(151, 151, 151)
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            padding 0 40px

          .detail
            display table
            margin 0 auto
            padding 0
            li
              float left
              list-style none
              margin 0 15px
              .amount
                font-size 15px
              .type
                font-size 13px
                color #464646

        .middle
          background-color #000
          position absolute
          left 360px
          width 562px
          height 330px
          .pl
            a
              text-decoration none
              color #fff
              img
                width 562px
                height 330px
                p
                  padding 0 20px
                  position relative
                  top 230px
                .title
                  font-size 22px
                  font-weight 550px
        .right
          float right
          width 268px
          height 330px
          .top
            width 268px
            height 160px
            margin-bottom 10px
            img
              width 268px
              height 160px
          .bottom
            width 268px
            height 160px
            img
              width 268px
              height 160px
</style>
