<template>
  <div id="app">
    <div class="chat">
      <el-form v-if="registered" class="login_box">
        <el-form-item>
          {{ $t("Username") }}
          <el-input type="text" v-model="loginForm.account" />
        </el-form-item>
        <el-form-item>
          {{ $t("Password") }}
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            :suffix-icon="View"
            show-password
          />
        </el-form-item>
        <div class="bot">
          <el-button @click="loginSubmit">{{ $t("Login") }}</el-button>
<!--          <el-button style="float: right" @click="register">-->
<!--            {{ $t("Register") }}-->
<!--          </el-button>-->
        </div>
      </el-form>
      <el-form
        v-if="!registered"
        ref="registerFormRef"
        class="login_box"
        :rules="rules"
      >
        <el-form-item
          >{{ $t("Username") }}
          <el-input type="text" v-model="registerForm.account" />
        </el-form-item>
        <el-form-item prop="password"
          >{{ $t("Password") }}
          <el-input
            type="password"
            v-model="registerForm.password"
            :suffix-icon="View"
            show-password
          />
        </el-form-item>
        <el-form-item
          >{{ $t("Password2") }}
          <el-input
            type="password"
            v-model="registerForm.password2"
            :suffix-icon="View"
            show-password
          />
        </el-form-item>

        <el-form-item
          >{{ $t("InvitationCode") }}
          <el-input type="text" v-model="registerForm.promo_code" />
        </el-form-item>

        <div class="bot">
          <el-button
            :disabled="!isPasswordValid"
            @click="registerSubmit()"
          >
            {{ $t("Confirm") }}
          </el-button>
          <el-button style="float: right" @click="back">
            {{ $t("Back") }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  el: '#app',
  data: function () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      registerForm: {
        account: '',
        password: {
          type: 'string',
          required: true
        },
        password2: '',
        promo_code: '' // 邀请码
      },
      loggedIn: false,
      registered: true,
      messageToSend: '',
      messages: [],
      ws: null,
      passwordType: 'password',
      rules: {
        password: [
          // { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 20, message: '长度在 6 到 30个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    loginSubmit: function () {
      // 提交登陆按钮
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          router.replace('chatroom')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    register: function () {
      this.registered = false
    },
    registerSubmit: function (registerFormRef) {
      // 提交注册按钮
      console.log(registerFormRef)
      registerFormRef.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$store
            .dispatch('user/register', registerFormRef)
            .then(() => {
              this.registered = true
            })
            .catch(() => {})
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    back: function () {
      this.registered = true
    },
    validPassword: function (rule, value, callback) {
      console.log(rule)
      console.log(value)
      if (value.length === 0) {
        // 自定义验证条件，返回错误提示文字
        callback(new Error('请输入密码'))
      }

      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
      if (!reg.test(value)) {
        callback(new Error('密码必须是由4-20位字母+数字组合'))
      } else {
        callback()
      }
    }
  },
  computed: {
    isPasswordValid () {
      return this.registerForm.password === this.registerForm.password2
    }
  },
  mounted () {
    // console.log(this.$store.getters);
  }
}
</script>

<style lang="css">
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.login_box {
  top: 10px;
  width: 240px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 30px 20px;
  /*border-radius: 8px;*/
  background-color: hsla(160, 100%, 37%, 1);
  border-radius: 8px;
  color: white;
}

.bot {
  top: 15px;
  border-radius: 100px;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
