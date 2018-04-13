<template>
    <div id="app">
      <div class="main">
        <v-header :show="false"></v-header>
        <div class="content">
          <transition name="register-fade" mode="in-out">
          <div class="register" v-if="showRegister">
            <el-menu default-active="1"mode="horizontal">
              <el-menu-item index="1">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;   &nbsp;   用户登录 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;  </el-menu-item>
              <el-menu-item index="2"> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;    职业人登录 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;    </el-menu-item>
            </el-menu>
            <p>邮箱登录</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="registerFrom">
              <el-form-item prop="email" >
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="password" >
                <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 220px;font-size: 16px">登录</el-button>
              </el-form-item>
            </el-form>
            <p class="case" @click="change()">立即注册</p>
            <a href="register.html" target="_blank">忘记密码</a>
          </div>
          </transition>
          <transition name="register-fade" mode="in-out">
          <div class="register" v-if="showLogin">
            <!--<el-menu default-active="1"mode="horizontal">-->
              <!--<el-menu-item index="1">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;   &nbsp;   用户登录 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;  </el-menu-item>-->
              <!--<el-menu-item index="2"> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;    职业人登录 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;    </el-menu-item>-->
            <!--</el-menu>-->
            <p>邮箱注册</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleFormR" label-width="100px" class="registerFrom" >
              <el-form-item prop="email" >
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="code"  >
                <el-input v-model="ruleForm.code" placeholder="邮箱验证码" style="width: 130px" ></el-input>
                <el-button type="primary" v-if="show" @click="disabled('ruleFormR')">获取验证码</el-button>
                <el-button type="primary" disabled v-else style="width: 110px">{{count}}s</el-button>
              </el-form-item>
              <el-form-item prop="password" >
                <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleFormR')" style="width: 220px;font-size: 16px">登录</el-button>
              </el-form-item>
            </el-form>
            <p class="case" @click="change()">立即注册</p>
            <a href="register.html" target="_blank">忘记密码</a>
          </div>
          </transition>
        </div>
      </div>
    </div>
</template>

<script>

import header from '@/components/Header'
import axios from 'axios'
export default {
  components:{
    'v-header': header
  },data() {
     var checkEmail = (rule, value, callback)=>{
       let reg =/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
       if(!value){return callback(new Error('请输入邮箱11'));}
       else if (!reg.test(value)){
         return callback(new Error('邮箱格式不正确'))
       }
       else callback();
     }
    return {
      count: '',
      timer: null,
      show:true,
      showRegister:true,
      showLogin:false,
      ruleForm: {
        email: '',
        password: '',
      },ruleFormR: {
        email: '',
        password: '',
        code:'',
      },
      rules: {
        email: [
          { required: true, validator:checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    disabled(formName){
      this.$refs[formName].validateField('email',(gg) => {
        if(!gg){
          if (!this.timer) {
            const TIME_COUNT = 60;
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        }
      });
    },
    change(){
      this.showRegister = !this.showRegister;
      this.showLogin = !this.showLogin;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .main
    width 100%
    height 100%
    .content
      .register-fade-enter-active
        transition: all .8s ease;
      .register-fade-leave-active
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      .register-fade-enter, .register-fade-leave-to
        transform: translateY(100px);
        opacity: 0;
      position relative
      top 80px
      padding-bottom 80px
      vertical-align: middle
      width 100%
      height 867px
      background #fff url("../../assets/bg-login.png") no-repeat center

      .register
        position absolute
        top 170px
        left 50%
        margin-left -173px
        background #fff
        box-shadow 0 0 3px 0 #DAC9A6
        text-align: center
        width 347px
        height 470px
        p
          padding 20px 0
          font-weight 200
          font-size 25px
        .case
          padding 10px 0
          font-weight 180
          font-size 17px
          color #90B44B
          cursor pointer
        a
          text-decoration none
          color #000
          margin-right 2px
          font-size 14px
        .registerFrom
          margin 0 50px 0 -50px
</style>
