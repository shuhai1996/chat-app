<script>
import router from "../router";
export default {
  el: "#app",
  data: function () {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      password2: "",
      loggedIn: false,
      registered: true,
      messageToSend: "",
      messages: [],
      ws: null,
      passwordType: "password",
    };
  },
  methods: {
    loginSubmit: function () {
      //提交登陆按钮
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          router.replace("chatroom");
        })
        .catch(() => {});
    },
    register: function () {
      this.registered = false;
    },
    registerSubmit: function () {
      //提交注册按钮
      console.log(this.username);
    },
    logout: function () {
      this.ws.send(JSON.stringify({ type: "logout" }));
      this.ws.close();
      this.loggedIn = false;
    },
    back: function () {
      this.registered = true;
    },
  },
  computed: {
    isPasswordValid() {
      return this.password === this.password2;
    },
  },
  mounted() {
    console.log(this.$store.getters);
  },
};
</script>

<template>
  <div id="app">
    <div class="chat">
      <div>
        <div v-if="registered" class="login_box">
          <div>
            <label>{{ $t("Username") }}</label>
          </div>

          <el-input type="text" v-model="loginForm.account" />

          <div>
            <label>{{ $t("Password") }}</label>
          </div>
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            :suffix-icon="View"
            show-password
          />
          <div class="bot">
            <el-button type="label" @click="loginSubmit">{{
              $t("Login")
            }}</el-button>
            <el-button style="float: right" @click="register">
              {{ $t("Register") }}
            </el-button>
          </div>
        </div>
        <div v-if="!registered" class="login_box">
          <div>
            <label>{{ $t("Username") }}</label>
          </div>
          <el-input type="text" v-model="username" />
          <div>
            <label>{{ $t("Password") }}</label>
          </div>
          <el-input
            type="password"
            v-model="password"
            :suffix-icon="View"
            show-password
          />
          <div>
            <label> {{ $t("Password2") }}</label>
          </div>
          <el-input
            type="password"
            v-model="password2"
            :suffix-icon="View"
            show-password
          />
          <div class="bot">
            <el-button
              type="submit"
              :disabled="!isPasswordValid"
              @click="registerSubmit"
            >
              {{ $t("Confirm") }}
            </el-button>
            <el-button style="float: right" @click="back">
              {{ $t("Back") }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.login_box {
  top: 50px;
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /*border-radius: 8px;*/
  background-color: hsla(160, 100%, 37%, 1);
  border-radius: 8px;
  color: white;
}
.bot {
  top: 10px;
  border-radius: 100px;
}
</style>
