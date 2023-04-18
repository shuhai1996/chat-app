<template>
  <div id="app">
    <div class="chatroom">
      <div class="chat__messages">
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat__message"
          :class="{ 'chat__message--mine': message.mine }"
        >
          <div class="chat__message-user">{{ message.username }}</div>
          <div class="chat__message-text" v-html="message.text"></div>
        </div>
        <div :hidden = "!showLoading">正在思考中，请稍后...<img src="../assets/loading.gif" alt="loading" class="loading"></div>
      </div>
      <div class="chat__input">
        <textarea id="myInput" v-model="text" @input="resizeTextarea" />
        <button @click="sendMessage">{{ $t("Send") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { getCookie } from '../utils/auth.js'
import router from '../router'
import { marked } from 'marked'

const state = reactive({
  messages: [
  ],
  text: '',
  username: '',
  lastId: 0
})

export default {
  data: function () {
    return {
      messages: state.messages,
      text: state.text,
      token: this.$store.getters.token,
      username: this.$store.getters.username,
      showLoading: true
    }
  },
  mounted () {
    console.log('token')
    console.log(this.token)
    console.log(this.username)
    const input = document.getElementById('myInput')
    if (getCookie('lang') === 'zh_CN') {
      // 中文
      input.setAttribute('placeholder', '在这里输入你的消息...')
    } else {
      input.setAttribute('placeholder', 'Type your message here...')
    }
    // 连接 WebSocket 服务器
    this.ws = new WebSocket(
      import.meta.env.VITE_SOCKET_URL,
      this.token
    )
    this.ws.onopen = function () {
    }
    this.ws.onmessage = (event) => {
      // 接收到服务器响应，重置计时器
      console.log(this.ws)
      const res = JSON.parse(event.data)
      console.log(res)
      if (res.type === 'server') {
        state.messages.pop() // 把最后一个节点移除掉，重新添加一个干净的
        this.toggleLoading()
        state.lastId++
        state.messages.push({
          id: state.lastId,
          username: 'ChatGpt',
          text: res.message,
          mine: false
        })
        state.text = ''
      } else if (res.message === '!!!Words finished!!!') {
        this.toggleLoading()
        state.text = ''
      } else {
        state.messages.pop() // 把最后一个节点移除掉，重新添加一个干净的
        state.text += res.message
        state.lastId++
        state.messages.push({
          id: state.lastId,
          username: 'ChatGpt',
          text: marked(state.text),
          mine: false
        })
      }
    }
    this.ws.onclose = () => {
      console.log('连接关闭')
      this.$store.dispatch('user/logout')
      router.replace('chat')
    }
  },
  methods: {
    resizeTextarea (event) {
      event.target.style.height = 'auto'
      event.target.style.height = event.target.scrollHeight + 'px'
    },
    sendMessage () {
      state.lastId++
      state.messages.push({
        id: state.lastId,
        username: this.username,
        text: this.text,
        mine: true
      })
      this.ws.send(this.text)
      state.text = ''
      this.text = ''
      state.lastId++
      state.messages.push({
        id: state.lastId,
        username: 'ChatGpt',
        text: '',
        mine: false
      })
      this.toggleLoading()
    },
    toggleLoading () {
      this.showLoading = !this.showLoading
      return true
    }
  }
}
</script>

<style lang="css">
.chatroom {
  display: flex;
  flex-direction: column;
  height: 150%;
  overflow-y: auto; /* 垂直方向上滚动 */
  width: 480px;
}

.chat__messages {
  flex: 1;
  overflow-y: auto;
}

.chat__message {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: #eee;
  word-wrap: break-word;
  overflow-x: scroll;
}

.chat__message--mine {
  align-self: flex-end;
  background-color: #4caf50;
  color: #fff;
}

.chat__message-user {
  font-weight: bold;
}

.chat__message-text {
  max-width: 600px;
  margin-top: 4px;
}

.chat__input {
  display: flex;
  margin-top: 16px;
  overflow-y: auto;
}

.chat__input input {
  flex: 1;
  padding: 2px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.chat__input button {
  padding: 8px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.chat__input button:hover {
  background-color: #3e8e41;
}

textarea {
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
}

.loading {
  width: 1rem;
  height: 1rem;
}
</style>
