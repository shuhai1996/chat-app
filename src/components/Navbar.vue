<template v-slot:dropdown>
  <div class="navbar">
    <div class="right-menu">
      <label slot="dropdown" class="user-dropdown">
        <a target="_blank" href="https://github.com/shuhai1996/">Github |</a>
        <label style="margin-left: 5px" @click="changeLang()"
          >{{ this.lang }}
        </label>
      </label>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from '../utils/auth.js'
export default {
  components: {},
  data () {
    return {
      locale: 'zh_CN',
      lang: 'EN'
    }
  },
  computed: {},
  mounted () {
    if (getCookie('lang') === 'zh_CN') {
      this.locale = 'zh_CN'
      this.lang = 'EN'
    }
    if (getCookie('lang') === 'en') {
      this.locale = 'en'
      this.lang = '中文'
    }
  },
  methods: {
    changeLang () {
      const self = this
      // 增加传入语言
      if (self.locale === 'zh_CN') {
        // self.lang = "ENG";
        self.locale = 'en'
      } else {
        self.lang = '中文'
        self.locale = 'zh_CN'
      }
      setCookie('lang', self.locale === 'zh_CN' ? 'zh_CN' : 'en')
      window.location.reload() // 进行刷新改变页面翻译
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  top: 20px;
  left: 20px;
  overflow: hidden;
  position: sticky;
  background: #fff;
  cursor: pointer;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: left;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
