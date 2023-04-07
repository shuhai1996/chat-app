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
          <div class="chat__message-text">{{ message.text }}</div>
        </div>
      </div>
      <div class="chat__input">
        <textarea id="myInput" v-model="text" @input="resizeTextarea" />
        <button @click="sendMessage">{{ $t("Send") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { getCookie } from "../utils/auth.js";
const state = reactive({
  messages: [
    { id: 1, username: "Bot", text: "Hello", mine: false },
    { id: 2, username: "Me", text: "Hi", mine: true },
    { id: 3, username: "Bot", text: "How are you?", mine: false },
    {
      id: 4,
      username: "Me",
      text: "I'm fine, thanks. And you?",
      mine: true,
    },
    { id: 5, username: "Bot", text: "I'm good too.", mine: false },
  ],
  text: "",
  username: "Me",
  lastId: 5,
});
export default {
  data: function () {
    return {
      messages: state.messages,
      text: state.text,
    };
  },
  mounted() {
    const input = document.getElementById("myInput");
    if (getCookie("lang") === "zh_CN") {
      //中文
      input.setAttribute("placeholder", "在这里输入你的消息...");
    } else {
      input.setAttribute("placeholder", "Type your message here...");
    }
  },
  methods: {
    resizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    },
    sendMessage() {
      console.log(this.text)
      state.lastId++;
      state.messages.push({
        id: state.lastId,
        username: state.username,
        text: this.text,
        mine: true,
      });
      state.text = "";
    },
  },
};
</script>

<style lang="css">
.chatroom {
  display: flex;
  flex-direction: column;
  height: 150%;
  overflow-y: auto; /* 垂直方向上滚动 */
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
</style>
