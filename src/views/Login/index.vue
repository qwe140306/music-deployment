<template>
  <div class="login-container">
    <van-nav-bar title="登陆" left-arrow @click-left="onClickLeft"/>

    <div class="login-form">
      <div class="text">
        <p class="welcome">登录体验更多精彩</p>
        <p class="welcome-tip">未注册手机号登录后将自动创建账号</p>
      </div>

      <van-form @submit="onSubmit" :show-error-message="false" center label-width="200px">
        <van-cell-group>
          <van-field
              v-model="phone"
              placeholder="请输入手机号"
              maxlength="11"
              name="phone"
              :rules="[{ required: true }]"
          />
          <!--    验证码     -->
          <div class="sms" v-if="isSms">
            <van-field
                v-model="captcha"
                name="captcha"
                center
                clearable
                placeholder="短信验证码"
                maxlength="6"
                :rules="[{ required: true }]"
            >
              <template #button>
                <van-button v-if="sendSms" class="sms-btn" @click.prevent="getSms" size="small" color="#f6f6f6">发送验证码
                </van-button>
                <van-button v-else class="sms-btn" disabled @click.prevent="getSms" size="small" color="#f6f6f6">
                  {{ smsTime }}
                </van-button>
              </template>
            </van-field>
          </div>

          <!--     密码     -->
          <van-field
              v-else
              v-model="password"
              type="password"
              name="password"
              placeholder="请输入密码"
              :rules="[{ required: true }]"
          />
        </van-cell-group>

        <div class="submit">
          <van-button round block color="#e04439" native-type="submit">
            登录
          </van-button>
          ·
        </div>
      </van-form>
      <van-row type="flex" justify="space-around">
        <van-col span="6" @click="handleSwitch">
          {{ isSms ? "密码登录" : "验证码登录" }}
        </van-col>
        <van-col span="6">
          忘记密码?
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

import store from '@/store'
import {setItem} from "@/utils/storage";

export default {
  name: 'Login',
  data() {
    return {
      phone: '19120550133',
      password: 'qq1403065002',
      captcha: '',
      // 是否使用验证码登录
      isSms: true,
      smsTime: 60,
      // 是否发送了验证吗
      sendSms: true,
      timer: 0,
    };
  },

  methods: {
    handleSwitch() {
      this.isSms = !this.isSms
      this.sms = ''
      this.password = ''
    },
    async getSms() {
      if (this.smsTime !== 60) {
        return
      }
      if (this.phone.length !== 11) {
        return this.$toast.fail('请输入正确手机号');
      }

      // 发送请求之后在开启定时器,如果请求失败,那么
      const {data: res} = await this.$axios.post('/captcha/sent', {phone: this.phone})
      // 发送请求
      this.sendSms = false
      if (res.code !== 200) {
        // 停止定时器
        clearInterval(this.timer);
        this.smsTime = 60
        this.sendSms = true
        // 提示用户
        this.$toast.fail("网络请求失败,请稍后重试")
      }
      this.timer = setInterval(() => {
        this.smsTime--
        if (this.smsTime === 0) {
          clearInterval(this.timer)
          this.smsTime = 60
          this.sendSms = true
        }
      }, 1000)
    },


    async onSubmit(values) {

      // 校验手机号 验证码
      try {
        const {data} = await this.$axios.post(`/login/cellphone?date=${Date.now()}`, {...values})
        if (data.code === 502) {
          return this.$toast.fail(data.msg)
        }
        //保存cookie
        setItem('cookie', data.cookie)
        store.commit('COOKIE', data.cookie)
        // 跳转页面
        await this.$router.replace({
          path: `${this.$route.params.redirect ? this.$route.params.redirect : '/home'}`
        })

      } catch (e) {
        this.$toast.fail(e.response.data.msg)
      }
    },

    onClickLeft() {
      this.$router.replace({name: 'Home'})
    },
  },


  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>

<style scoped lang="less">

.login-container {

  .login-form {
    padding: 15px;

    .van-form {
      margin-top: 15px;

      .van-field {
        padding: 10px;
        background-color: #f6f6f6;
        margin-bottom: 15px;


        /deep/ .van-field__control {
          height: 33px !important;
          padding-left: 5px;
        }
      }

      .sms-btn {
        font-size: 12px;
        width: 82px;
        height: 33px;

        /deep/ .van-button__text {
          color: #000;
        }


      }

      .submit {
        margin: 30px 0 20px;

        .van-button {
          height: 38px;
        }
      }

    }


    //文本
    .text {
      .welcome {
        margin-bottom: 10px;
      }

      .welcome-tip {
        font-size: 12px;
        margin: 0;
        color: #a5a5a5;
      }
    }

  }

  .van-row {
    font-size: 14px;
    text-align: center;
    color: #0c4065;
  }

  // 顶部导航条
  .van-nav-bar {
    background-color: #e04439;

    /deep/ .van-icon,
    /deep/ .van-nav-bar__title {
      color: white;
    }
  }


}

</style>
