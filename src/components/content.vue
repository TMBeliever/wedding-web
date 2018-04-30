<template>
    <div class="content">
      <div class="header">
        <h3>推荐案例</h3>
        <a href="caseDetail.html#all">查看更多<i class="el-icon-arrow-right"></i></a>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="森系" name="first"><v-case :caseData="data" v-if="flag" :total="total"></v-case></el-tab-pane>
          <el-tab-pane label="西式" name="second"><v-case :caseData="data" v-if="flag" :total="total"></v-case></el-tab-pane>
          <el-tab-pane label="户外" name="third"><v-case :caseData="data" v-if="flag" :total="total"></v-case></el-tab-pane>
          <el-tab-pane label="韩式" name="fourth"><v-case :caseData="data" v-if="flag" :total="total"></v-case></el-tab-pane>
          <el-tab-pane label="中式" name="five"><v-case :caseData="data" v-if="flag" :total="total"></v-case></el-tab-pane>
        </el-tabs>
        <h3>合作酒店</h3>
        <a href="hotelDetail.html#all">查看更多<i class="el-icon-arrow-right"></i></a>
        <v-hotel :hotelData="hotelData" v-if="hotelFlag"></v-hotel>
      </div>

    </div>
</template>

<script>
  import axios from 'axios'
  import cases from '@/components/case'
  import hotel from '@/components/hotel'
export default {
    components:{
      'v-case':cases,
      'v-hotel':hotel,
    },
   data(){
     return {
       flag : false,
       total:[],
       hotelFlag:false,
       data:[],
       hotelData:[],
       activeName: 'first',
       type1 : [],
       type2 : [],
       type3 : [],
       type4 : [],
       type5 : [],
     }
   },
  methods: {
    handleClick(tab, event) {
      switch (tab.label){
        case '森系':
          this.data = this.type1
//          console.log( this.data)
          let NUM = 0;
          for(let j=0;j<this.type1.length;j++){
            for(let i =0;i<this.type1[j].budget.length;i++){
              NUM += this.type1[j].budget[i].price * this.type1[j].budget[i].amount
            }
            this.total[j]=NUM
            NUM = 0;
          }
           break
        case '西式':
          this.data = this.type2
           NUM = 0;
          for(let j=0;j<this.type2.length;j++){
            for(let i =0;i<this.type2[j].budget.length;i++){
              NUM += this.type2[j].budget[i].price * this.type2[j].budget[i].amount
            }
            this.total[j]=NUM
            NUM = 0;
          }
          break
        case '户外':
          this.data = this.type3
         NUM = 0;
          for(let j=0;j<this.type3.length;j++){
            for(let i =0;i<this.type3[j].budget.length;i++){
              NUM += this.type3[j].budget[i].price * this.type3[j].budget[i].amount
            }
            this.total[j]=NUM
            NUM = 0;
          }
          break
        case '韩式':
          this.data = this.type4
         NUM = 0;
          for(let j=0;j<this.type4.length;j++){
            for(let i =0;i<this.type4[j].budget.length;i++){
              NUM += this.type4[j].budget[i].price * this.type4[j].budget[i].amount
            }
            this.total[j]=NUM
            NUM = 0;
          }
          break
        case '中式':
          this.data = this.type5
        NUM = 0;
          for(let j=0;j<this.type5.length;j++){
            for(let i =0;i<this.type5[j].budget.length;i++){
              NUM += this.type5[j].budget[i].price * this.type5[j].budget[i].amount
            }
            this.total[j]=NUM
            NUM = 0;
          }
          break
      }
    }
  },
  created(){
     axios({
       method: 'get',
       url: 'http://localhost/blog/public/api/case/case',
     })
       .then((res)=>{
         for(let i in res.data.data){
         switch(res.data.data[i].type){
           case '1':
             this.type1.push(res.data.data[i])
             break
           case '2':
             this.type2.push(res.data.data[i])
             break
           case '3':
             this.type3.push(res.data.data[i])
             break
           case '4':
             this.type4.push(res.data.data[i])
             break
           case '5':
             this.type5.push(res.data.data[i])
             break
         }
         this.data = this.type1
           let NUM = 0;
           for(let j=0;j<this.type1.length;j++){
             for(let i =0;i<this.type1[j].budget.length;i++){
               NUM += this.type1[j].budget[i].price * this.type1[j].budget[i].amount
             }
             this.total[j]=NUM
             NUM = 0;
             this.flag = true
           }
         }
       })
    axios({
      method: 'get',
      url: 'http://localhost/blog/public/api/hotel/hotel',
    })
      .then((res)=>{
        this.hotelData = res.data.data
        this.hotelFlag = true
      })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .content
    margin  10px 0
    min-width 1300px
    .header
      margin 0 77px 0
      h3
        display inline-block
        font-size 25px
        color rgb(70, 70, 70)
      a
        text-decoration none
        color #B4B7BA
        font-weight 200
        font-size 17px
        display inline-block
        margin-left  900px
        margin-top  25px

</style>
