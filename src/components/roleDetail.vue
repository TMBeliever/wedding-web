 <template>
    <div class="roleDetail">
      <div class="content" v-if="dataFlag">
        <div class="submenu">
          <span>婚礼团队 <i class="el-icon-arrow-right"></i></span>
          <span><a href="">策划师</a></span>
        </div>
        <div class="mainCase" v-if="!(data.planner==false)">
          <div class="img">
            <img :src="data.planner[0].case1s.img.split(',')[0]">
          </div>
          <div class="backinfo">
            <div class="ceil">
              <p class="title">{{data.planner[0].case1s.title}}</p>
              <p class="subtitle">{{data.planner[0].case1s.subtitle}}</p>
              <p>
                <a :href="'caseDetail.html#/case/'+data.planner[0].case1s.id">查看案例</a>
              </p>
            </div>
          </div>
        </div>
        <div class="mainCase" v-if="!(data.photographer==false)">
          <div class="img">
            <img :src="data.photographer[0].case1s.img.split(',')[0]">
          </div>
          <div class="backinfo">
            <div class="ceil">
              <p class="title">{{data.photographer[0].case1s.title}}</p>
              <p class="subtitle">{{data.photographer[0].case1s.subtitle}}</p>
              <p>
                <a :href="'caseDetail.html#/case/'+data.photographer[0].case1s.id">查看案例</a>
              </p>
            </div>
          </div>
        </div>
        <div class="mainCase" v-if="!(data.host==false)"host>
          <div class="img">
            <img :src="data.host[0].case1s.img.split(',')[0]">
          </div>
          <div class="backinfo">
            <div class="ceil">
              <p class="title">{{data.host[0].case1s.title}}</p>
              <p class="subtitle">{{data.host[0].case1s.subtitle}}</p>
              <p>
                <a :href="'caseDetail.html#/case/'+data.host[0].case1s.id">查看案例</a>
              </p>
            </div>
          </div>
        </div>
        <div class="userinfo">
          <p class="img"><img src="http://image.izhaowo.com/8_0e9c8ed5-8f2a-473f-91e7-0d116980cd4f.jpg@80w_80h_1e_1c_0l" v-popover:popover></p>
          <p class="name">{{data.role1.name}}</p>
          <p class="price">¥ {{data.role1.price}}</p>
          <ul class="detail">
            <li>
              <p class="amount">{{data.orderCount}}</p>
              <p class="type">预定量</p>
            </li>
            <li>
              <p class="amount">{{data.commentCount}}</p>
              <p class="type">评论量</p>
            </li>
          </ul>
          <P class="describe">{{data.role1.describe}}</P>
          <p class="data">费用及档期</p>
          <P class="icon"><i class="el-icon-circle-plus" v-if="!Info" @click="showInfo"></i>
              <i class="el-icon-circle-close" v-if="Info"  @click="showInfo"></i>
          </P>
          <el-collapse-transition>
          <div class="info" v-if="Info">
            <p class="service">服务类型</p>
            <div class="price">
              <p>婚礼策划统筹</p>
              <p>¥ {{data.role1.price}}</p>
            </div>
            <p class="slogan">{{data.role1.service}}</p>
            <p>服务区域</p>
            <p class="place">{{data.role1.place}}</p>
            <p>服务档期</p>
             <p class="state"><span class="s"><i class="i"></i>已预订</span><span class="s"><i  class="i" style="background-color: #8c939d"></i>今日忙</span></p>
            <p class="dateIcon">
              <i class="el-icon-circle-plus" v-if="!dateInfo" @click="showDate"></i>
              <i class="el-icon-circle-close" v-if="dateInfo"  @click="showDate"></i>
            </p>
            <el-collapse-transition>
            <div class="date" v-if="dateInfo">
              <div class="time" v-for="(time,index) in  dateValue">
                {{time}}
              </div>
            </div>
              </el-collapse-transition>
          </div>
          </el-collapse-transition>
          <div class="find">
            <span class="call">联系TA</span>
            <span class="buy" @click="buyCart">加入购物车</span>
          </div>
        </div>
        <div class="case">
          <h2 style="color: #464646">真实婚礼案例</h2>
          <div class="allCase" v-for="(cases,index) in data.photographer" v-if="index<8||loadingFlag">
            <a :href="'caseDetail.html#/case/'+cases.case1s.id"><img :src="cases.case1s.img.split(',')[0]"></a>
            <p>{{cases.case1s.title}}</p>
          </div>
          <P class="loading" @click="loadingMore" v-if="!loadingFlag">加载更多</P>
        </div>
        <div class="comment">
          <h2 style="color: #464646">用户点评{{data.commentCount}}条</h2>
          <div class="nav">
            <div class="user" v-for="(comment,index) in data.comments"  v-if="index<10">
              <img src="http://image.izhaowo.com/www2/images/pic75x75.jpg" class="portrait">
              <ul><li><span class="username">{{comment.role.email}}  </span></li>
                <li> <span style="font-size: 14px;color:#979797 ">婚礼策划统筹</span></li>
              </ul>
              <p class="text">{{comment.content}}</p>
              <p class="time1">{{comment.created_at}}</p>
            </div>
          </div>
        </div>
        <el-popover
          ref="popover"
          placement="left"
          width="350"
          trigger="hover">
          <el-row style="margin-bottom: 20px;margin-top: 10px">
            <el-col :span="12"><div class="grid-content bg-purple">性别: {{data.sex}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">年龄: {{data.role1.age}}岁</div></el-col>
          </el-row>
          <el-row style="margin-bottom: 20px">
            <el-col :span="12"><div class="grid-content bg-purple">身高：{{data.role1.tall}}cm</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">体重：{{data.role1.weight}}kg</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">所在地：{{data.role1.place}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">电话：订单详情中查看</div></el-col>
          </el-row>
        </el-popover>
      </div>
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
      return{
        data:[],
        dataFlag:false,
        Info:false,
        dateInfo:false,
        loadingFlag:false,
        dateValue: []
      }
    },
    methods:{
      showInfo(){
        this.Info = !this.Info
      },
      loadingMore(){
        this.loadingFlag = true
      },
      showDate(){
        this.dateInfo = !this.dateInfo
      },
      buyCart() {
        this.$confirm('是否加入购物车, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '加入成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消加入'
          });
        });
      }
    },

    created(){
      axios({
        method:'post',
        url:'http://localhost/blog/public/api/role/roleDetail',
        data:{
          id:this.$route.params.id
        }
      })
        .then((res)=>{
          this.data = res.data.data[0]
          console.log(this.data)
         for(let i=0;i<res.data.data[0].dates.length;i++){
            this.dateValue.push(res.data.data[0].dates[i].time)
         }
          this.dataFlag = true
        })
        .catch((err)=>{
        console.log(err)
        })
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .roleDetail
    width 100%
    height 100%
    position relative
    &:after
      content '.'
      visibility hidden
      height 0
      line-height 0
      display block
      clear both
    .content
      width 1170px
      height 500px
      margin 90px auto
      .submenu
        margin-bottom 10px
        font-size 13px
        a
          text-decoration none
      .mainCase
        text-align center
        width 1170px
        height 480px
        position relative
        color #fff
        .title
          font-size 22px
          font-weight 600px
        .subtitle
          font-size 18px
          font-weight 500px
        a
          text-decoration none
          border 1px solid #fff
          color #fff
          padding 7px
        img
          width 1170px
          height 480px
        .backinfo
          width 1170px
          height 480px
          background rgba(0,0,0,0.50)
          position absolute
          top 0
          left 0
          .ceil
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
      .userinfo
        text-align center
        margin-top 35px
        .img
          img
            display inline-block
            width 80px
            height 80px
            border-radius 50%
        .name
          font-size 22px
          font-weight 600
        .price
          color #4EC2BD
          font-size 20px
          font-weight 500
        .detail
          display table
          margin 0 auto
          padding 0
          li
            float left
            list-style none
            margin 0 15px
            .amount
              font-size 22px
              margin-bottom 5px
              font-weight 500
            .type
              font-size 13px
              font-weight 500
              margin-top 0
              color #464646
        .describe
          color #464646
          font-size 15px
        .data
          font-size 25px
          font-weight 500
          color #464646
        .icon
          font-size 24px
          color #EB7A77
          cursor pointer
        .info
          .service
            margin-top 0
          .price
            margin 0 auto
            width 100px
            font-size 14px
            font-weight 300px
            border 1px solid #4EC2BD
          .slogan
            display inline-block
            width 600px
            font-size 13px
            color #464646
            line-height 21px
            margin-bottom 0
          .place
            font-size 13px
            color #464646
            margin-top 0
          .state
            font-size 13px
            color #464646
            .s
              margin-right 10px
            .i
              margin-right 3px
              display inline-block
              width 8px
              height 8px
              border-radius 50%
              background-color #3a8ee6
          .dateIcon
            font-size 24px
            color #3a8ee6
            cursor pointer
          .date
            width 100px
            margin-left 530px
            .time
              margin-bottom 10px
              color #3a8ee6
              padding 5px
              border 1px solid #3a8ee6
              &:last-child
                margin-bottom 0
        .find
          margin-top 10px
          .call
            display inline-block
            border 1px solid #464646
            height 36px
            line-height 36px
            cursor pointer
            border-radius 3px
            width 98px
            font-size 14px
            text-align center
            margin 12px 12px 0 0
            font-weight 500px
          .buy
            text-align center
            width 98px
            cursor pointer
            height 36px
            line-height 36px
            display inline-block
            border: 1px solid #57D2CD
            font-size 14px
            border-radius: 3px
            color: #4EC2BD
            font-weight 500px
      .case
        text-align center
        .loading
          cursor pointer
        .allCase
          width 271px
          height 239px
          margin-right 20px
          margin-bottom 20px
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05)
          float left
          text-align center
          background-color #fff
          &:after
            content '.'
            visibility hidden
            height 0
            line-height 0
            clear both
          img
            width 271px
            height 175px
      .comment
        .nav
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
            .text
              width 1100px
              margin-top -15px
            .time1
              margin-top -5px
              font-size 13px
              color #979797
              margin-bottom 5px
</style>
