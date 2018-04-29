<template>
    <div class="case">
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">
          <div class="case-info">
            <a :href="'caseDetail.html#/case/'+(caseData[0].id)"><img :src="caseData[0].img.split(',')[0]"></a>
            <h2>¥23888</h2>
            <p>{{caseData[0].title}}</p>
          </div>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"><div class="case-info">
          <a :href="'caseDetail.html#/case/'+(caseData[1].id)"><img :src="caseData[1].img.split(',')[0]"></a>
          <h2>¥23888</h2>
          <p>{{caseData[1].title}}</p>
        </div></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"><div class="case-info">
          <a :href="'caseDetail.html#/case/'+(caseData[2].id)"><img :src="caseData[2].img.split(',')[0]"></a>
          <h2>¥23888</h2>
          <p>{{caseData[2].title}}</p>
        </div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div><div class="case-info">
          <a :href="'caseDetail.html#/case/'+(caseData[3].id)"><img :src="caseData[3].img.split(',')[0]"></a>
          <h2>¥23888</h2>
          <p>{{caseData[3].title}}</p>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"><div class="case-info">
          <a :href="'caseDetail.html#/case/'+(caseData[4].id)"><img :src="caseData[4].img.split(',')[0]"></a>
          <h2>¥23888</h2>
          <p>{{caseData[4].title}}</p>
        </div></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div><div class="case-info">
          <a :href="'caseDetail.html#/case/'+(caseData[5].id)"><img :src="caseData[5].img.split(',')[0]"></a>
          <h2>¥23888</h2>
          <p>{{caseData[5].title}}</p>
        </div></el-col>
      </el-row>
    </div>
</template>

<script>
export default {
 props:{
   caseData:{
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
          width 380px
          height 250px
      h2
        color #4EC2BD
      p
        margin-top -10px
        font-weight 300
        font-size 16px
</style>
