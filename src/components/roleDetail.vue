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
          <div class="backinfo">photographer
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
             <p><span></span><span></span></p>
            <div class="date"></div>
          </div>
          </el-collapse-transition>
        </div>
        <div style="height: 400px">?????????????????????</div>
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
export default {
    data(){
      return{
        data:[],
        dataFlag:false,
        Info:false,
      }
    },
    methods:{
      showInfo(){
        this.Info = !this.Info
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
</style>
