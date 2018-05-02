<template>
    <div class="all">
      <div class="content">
        <div class="search">
          <p style="visibility: hidden">aaa</p>
          <div class="content">
            <p style="visibility: hidden;margin: 1px">???</p>
            <div class="type">
                 <el-tabs v-model="typeAction" @tab-click="typeClick">
                   <el-tab-pane label="不限" name="0"></el-tab-pane>
                  <el-tab-pane label="森系" name="1"></el-tab-pane>
                  <el-tab-pane label="西式" name="2"></el-tab-pane>
                    <el-tab-pane label="户外" name="3"></el-tab-pane>
                   <el-tab-pane label="韩式" name="4"></el-tab-pane>
                   <el-tab-pane label="中式" name="5"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="price">
              <el-tabs v-model="priceAction" @tab-click="priceClick">
                <el-tab-pane label="不限" name="0,10000000000000"></el-tab-pane>
                <el-tab-pane label="3000以下" name="0,3000"></el-tab-pane>
                <el-tab-pane label="3000-5000" name="3000,5000"></el-tab-pane>
                <el-tab-pane label="5000-10000" name="5000,10000"></el-tab-pane>
                <el-tab-pane label="10000以上" name="10000,10000000000000"></el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="sort">
            <el-tabs v-model="sortAction" @tab-click="sortClick">
              <el-tab-pane label="综合" name="id"></el-tab-pane>
              <el-tab-pane label="价格↑" name="sort" v-if="!showPriceB"></el-tab-pane>
              <el-tab-pane label="价格↓" name="desc" v-if="showPriceB"></el-tab-pane>
              <el-tab-pane label="浏览量↑" name="one" v-if="!browseAction"></el-tab-pane>
              <el-tab-pane label="浏览量↓" name="two" v-if="browseAction"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="nav" v-for="(cases,index) in data" v-if="index<=maxPages&&index>=minPages">
          <a :href="'caseDetail.html#/case/'+(cases.id)"><img :src="cases.img.split(',')[0]"></a>
          <div class="first"><span class="title">{{cases.title}}</span><span class="price">¥{{cases.total}}</span></div>
          <div class="second">
            <span>策划师：{{cases.orders.pl_user.role1.name}}</span>
           <span class="browse"><i class="el-icon-view"></i>{{cases.browse}}</span>
          </div>
          <div class="third"> <i class="el-icon-location-outline" style="font-size: 24px"></i> <span>{{cases.orders.hotel.place}}</span></div>
        </div>
        <div class="blank" v-if="this.data==false">
          <i class="el-icon-loading"></i>
          <div class="content" v-if="dataFlag">
            没有数据，真是抱歉！
          </div>
        </div>
      </div>
      <div class="block" v-if="dataFlag" >
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
  import '@/comment/stylus/comment.styl'
export default {
  components:{
      'v-footer':footer
    },

    data(){
      return {
        type:0,
        minPrice:0,
        maxPrice:0,
        typeAction: '0',
        priceAction:'0,10000000000000',
        browseAction:false,
        sortAction:'id',
        data:[],
        showData:[],
        search:'',
        showPriceB:false,
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
    },
    getData(){
      axios({
        method:'post',
        url: 'http://localhost/blog/public/api/case/allCase',
        data:{
          type:this.type,
          search:this.search
        }
      })
        .then((res)=>{
          if(res.status===200){
            this.data = res.data.data
            let NUM = 0;
            for(let j=0;j<this.data.length;j++){
              for(let i =0;i<this.data[j].budget.length;i++){
                NUM += this.data[j].budget[i].price * this.data[j].budget[i].amount
              }
              this.data[j].total=NUM
              NUM = 0;
              this.dataFlag = true
            }}
            this.showData = this.data
          this.priceAction = '0,10000000000000'
          this.sortAction ='id'
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    typeClick(tab, event) {
      this.type = parseInt(tab.name)
      this.getData();
    },
    priceClick(tab, event) {
      this.data = []
      for(let i =0;i<this.showData.length;i++){
//        console.log(this.showData[i].total)
        if(tab.name.split(',')[0]<this.showData[i].total&&this.showData[i].total<tab.name.split(',')[1]){
          this.data.push(this.showData[i])
        }
      }
       this.sortAction ='id'
//      console.log(this.data==false)
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
            return a.total - b.total
          })
          this.sortAction = 'sort'
          this.showPriceB = !this.showPriceB
          break
        case 'sort':
          this.data.sort((a,b)=>{
//            console.log(a)
            return b.total - a.total
          })
          this.sortAction = 'desc'
          this.showPriceB = !this.showPriceB
          break
        case 'one':
          this.data.sort((a,b)=>{
//            console.log(a)
            return b.browse - a.browse
          })
          this.sortAction = 'two'
          this.browseAction = !this.browseAction
          break
        case 'two':
          this.data.sort((a,b)=>{
//            console.log(a)
            return a.browse - b.browse
          })
          this.sortAction = 'one'
          this.browseAction = !this.browseAction
          break
      }
    },
  },
  created(){
      if(localStorage.getItem('search')) {
        this.search = localStorage.getItem('search')
        localStorage.removeItem('search')
      }
    axios({
      method:'post',
      url: 'http://localhost/blog/public/api/case/allCase',
      data:{
        type:this.type,
        search:this.search
      }
    })
      .then((res)=>{
        if(res.status===200){
          this.data = res.data.data
          let NUM = 0;
          for(let j=0;j<this.data.length;j++){
            for(let i =0;i<this.data[j].budget.length;i++){
              NUM += this.data[j].budget[i].price * this.data[j].budget[i].amount
            }
            this.data[j].total=NUM
            NUM = 0;

          this.dataFlag = true
        }}
        this.showData = this.data
      })
      .catch((err)=>{
        console.log(err)
      })
  },
  destroyed(){
    localStorage.removeItem('search')
  }
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
            .browse
              padding-right 10px
              float right
              font-size 17px
              color #EEA9A9
              .el-icon-view
                font-size 20px
                padding-right 6px
                position relative
                top 1px
          .third
            padding-left 10px
            padding-bottom 14px
            color #979797
            span
              font-size 13px
              position relative
              bottom  5px

        .search
          margin-top 65px
          margin-bottom 100px
          width 1170px
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
        .blank
          width 100%
          height 250px
          background-color #F4F4F4
          .el-icon-loading
            position absolute
            top 297px
            left 540px
            font-size 22px
          .content
            width 200px
            margin 200px auto
      .sort
        position relative
        bottom  40px
      .block
        position absolute
        left 50%
        transform translateX(-50%)
        bottom 130px
</style>
