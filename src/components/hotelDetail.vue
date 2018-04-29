<template>
  <div class="hotelDetail">
    <div class="main" v-if="dataFlag">
      <img :src="data.img">
      <div class="content">
        <h3>酒店详情</h3>
        <h1>{{data.name}}</h1>
        <div class="capacity">
          <span>{{data.amount}}桌婚宴席</span>
          <span>{{data.parking}}车位</span>
        </div>
        <div class="label">
          <div class="tag" v-for="label in data.label" >
          <span><el-tag type="success">{{label.label}}</el-tag></span>
          <span class="detail">{{label.detail}}</span>
          </div>
        </div>
        <div class="content">
          <div>
            <span>酒店类型</span>
            <span>{{data.banquet}}</span>
          </div>
          <div>
            <span>宴会厅数</span>
            <span>{{data.hall}}</span>
          </div>
          <div>
            <span>开业时间</span>
            <span>{{data.created_at}}</span>
          </div>
        </div>
        <div class="config">
          <div class="left">
            <div>   <span>面积</span>
              <span>{{data.area}}</span></div>
            <div><span>音响</span>
              <span>{{data.sound}}</span></div>
            <div>  <span>媒体</span>
              <span>{{data.media}}</span></div>
          </div>
          <div class="right">
            <div>  <span>舞台</span>
              <span>{{data.stage}}</span></div>
            <div> <span>可扩</span>
              <span>{{data.extend}}</span></div>
          </div>
        </div>
        <div class="menu">
          <h3>婚宴菜单</h3>
          <div class="info" v-for="menu in data.menu">
            <p><span>{{menu.type}}</span></p>
            <p><span>${{menu.price}}</span></p>
          </div>
        </div>
        <div class="place">
          <h3>地理位置</h3>
          <span> {{data.place}}</span>
        </div>
      </div>
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
      dataFlag:false
    }
  },
  created(){
    axios({
      method:'post',
      url: 'http://localhost/blog/public/api/hotel/hotelDetail',
      data:{
        id:this.$route.params.id
      }
    })
      .then((res)=>{
        if(res.status===200){
          this.data = res.data.data
          this.dataFlag = true
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .main
    width 1032px
    margin 90px auto
    span
      font-weight 550
    .content
      .capacity
        span
          margin-right 20px
          font-size 17px
          color #464646
      .label
        width 595px
        border-top   solid 2px #DADADA
        border-bottom    solid 2px #DADADA
        margin 15px 0
        padding-top 17px
        padding-bottom 6px
        .tag
          margin-bottom 10px
          .detail
            color #464646
            margin-left  40px
            font-size 16px
      .content
        color #464646
        width 595px
        border-bottom    solid 2px #DADADA
        margin 15px 0
        padding-top 12px
        padding-bottom 6px
        div
          margin-bottom 18px
          span
            margin-right 50px
            font-size 19px
      .config
        width 595px
        border-bottom    solid 2px #DADADA
        margin 15px 0
        padding-top 12px
        padding-bottom 6px
        color #464646
        &:after
          content '.'
          visibility hidden
          height 0
          line-height 0
          display block
          clear both
        .left
          float left
          div
            margin-bottom 24px
            span
              margin-right 89px
              font-size 19px
        .right
          div
            margin-bottom 24px
            span
              margin-right 89px
              font-size 19px
      .menu
        width 595px
        &:after
          content '.'
          visibility hidden
          height 0
          line-height 0
          display block
          clear both
        .info
          float left
          margin-right 20px
          margin-bottom 15px
          border solid 1px #DADADA
          width 122px
          text-align center
          color #464646
      .place
        span
          color #464646
          font-size 18px
</style>
