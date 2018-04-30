<template>
    <div class="caseDetail">
      <div class="content" v-if="this.dataFlag">
        <p class="title">案例图片 <i class="el-icon-circle-check-outline"></i></p>
        <div class="all">
          <div class="img" v-for="(url,index) in this.imgUrls" v-if="index<4||flag"><img :src="url"></div>
          <div class="showAll"><el-button type="primary" round @click="showAll" v-if="!flag">查看全部图片</el-button></div>
          <p>新人评价 <i class="el-icon-circle-check-outline"></i></p>
          <div class="user">
            <img src="http://image.izhaowo.com/www2/images/pic75x75.jpg" class="portrait">
            <ul><li><span class="username">新人：{{data.orders.user.email}}  </span></li>
            <li> <span style="font-size: 14px;color:#979797 ">对本场婚礼的评价</span></li>
            </ul>
          </div>
          <div class="comment" v-for="comment in data.comments">
            <div class="pl_user">
              <p>对 {{comment.role.role1.roletype}}: {{comment.role.role1.name}}</p>
              <p class="content">{{comment.content}}</p>
              <p class="time">{{comment.created_at}}</p>
            </div>
          </div>
        </div>
        <div :class="{'info':scrollY < 73,'info-scroll':(scrollY > 73)&&(scrollB>700),'info-finall':scrollB<700}">
          <h3>{{data.title}}</h3>
          <p style="font-size: 15px;color: #979797">策划师-{{data.orders.pl_user.role1.name}}</p>
          <p class="subtitle">{{data.subtitle}}</p>
          <p class="time" style="font-size: 15px;color: #979797">时间：{{data.orders.time}}</p>
          <p class="place" style="font-size: 15px;color: #979797">地点：{{data.orders.hotel.name}}</p>
          <div class="price">
            <span style="font-size: 15px">布置费 </span><span class="cout"> ¥ {{total}}</span>
            <el-button round v-popover:budget>报价明细</el-button>
          </div>
          <div class="team">
            <p style="font-size: 18px;font-weight: 600">婚礼团队 <i class="el-icon-arrow-down"></i></p>
            <p class="role" v-if="data.orders.pl_user">{{data.orders.pl_user.role1.roletype}}-{{data.orders.pl_user.role1.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>¥ {{data.orders.pl_user.role1.price}}</span></p>
            <p class="role" v-if="data.orders.ph_user">{{data.orders.ph_user.role1.roletype}}-{{data.orders.ph_user.role1.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>¥ {{data.orders.ph_user.role1.price}}</span></p>
            <p class="role" v-if="data.orders.ho_user">{{data.orders.ho_user.role1.roletype}}-{{data.orders.ho_user.role1.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>¥ {{data.orders.ho_user.role1.price}}</span></p>
          </div>
        </div >
        <el-popover
          ref="budget"
          placement="right"
          width="850"
          trigger="hover">
          <el-table :data="gridData">
            <el-table-column width="100" property="item" label="项目"></el-table-column>
            <el-table-column width="200" property="describe" label="应用实名"></el-table-column>
            <el-table-column width="100" property="source" label="来源"></el-table-column>
            <el-table-column width="100" property="quality" label="材质"></el-table-column>
            <el-table-column width="100" property="price" label="单价（元）"></el-table-column>
            <el-table-column width="50" property="amount" label="数量"></el-table-column>
            <el-table-column width="100" property="company" label="单位"></el-table-column>
            <el-table-column width="100" property="total" label="总价（元）"></el-table-column>
          </el-table>
        </el-popover>
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
      total:0,
      gridData:[],
      scrollY:0,
      scrollB:0,
      data:[],
      dataFlag:false,
      flag:false,
      imgUrls:[]
    }
  },
  methods:{
    showAll(){
      this.flag = true
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollY = scrollTop
      this.scrollB = document.documentElement.scrollHeight - scrollTop
      console.log(this.scrollB)
    }
  },
  created(){
    axios({
      method:'post',
      url: 'http://localhost/blog/public/api/case/caseDetail',
      data:{
        id:this.$route.params.id
      }
    })
      .then((res)=>{
        if(res.status===200){
          this.data = res.data.data
          this.imgUrls = res.data.data.img.split(',')
          this.gridData = res.data.data.budget
          for(let i =0;i<this.gridData.length;i++){
            this.gridData[i].total =  this.gridData[i].price *  this.gridData[i].amount
            this.total += this.gridData[i].price *  this.gridData[i].amount
          }
          this.dataFlag = true
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .content
    width 1000px
    margin 90px auto
    position relative
    .title
      color #979797
      font-size 16px
      font-weight 300
      line-height 16px
    .all
      width 664px
      .img
         max-width 664px
        img
          width 100%
          height 414
      .showAll
        width 120px
        margin 15px auto
        .el-button
          background-color #F4A7B9
          border-color #F4A7B9
          transition all .4s
          &:hover
            background-color #F8C3CD
            border-color #F8C3CD
      .comment
        .pl_user
          .content
            margin 5px 0
            font-size 16px
            color #FB966E
            width 664px
            word-wrap:break-word
          .time
            font-size 14px
            color #979797
      .user
        width 350px
        .portrait
          display inline-block
          height 64px;
          width 64px;
          border-radius 50%;
          border 1px solid rgba(0, 0, 0, 0.05);
          box-sizing border-box;
          -moz-box-sizing border-box;
          -webkit-box-sizing border-box;
        ul
          display inline-block
          list-style:none
          position relative
          top -20px
          left -30px
          li
            margin-bottom  8px
    .info
      width 308px
      height 100px
      position absolute
      right 0
      top 32px
      .price
        .cout
          color #4EC2BD
        .el-button
          font-size 11px
          float right
          height 20px
          line-height 2px
          margin-top -3px

      .team
        .role
          font-size 15px
          font-weight 400
          span
            color #4EC2BD

    .info-scroll
      width 308px
      height 100px
      position fixed
      top 70px
      right 174px
      .price
        .cout
          color #4EC2BD
        .el-button
          font-size 11px
          float right
          height 20px
          line-height 2px
          margin-top -3px

      .team
        .role
          font-size 15px
          font-weight 400
          span
            color #4EC2BD

    .info-finall
      width 308px
      height 100px
      position absolute
      right 0
      bottom  320px
      .price
        .cout
          color #4EC2BD
        .el-button
          font-size 11px
          float right
          height 20px
          line-height 2px
          margin-top -3px

      .team
        p
        .role
          font-size 15px
          font-weight 400
          span
            color #4EC2BD

</style>
