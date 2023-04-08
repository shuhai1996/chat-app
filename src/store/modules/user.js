import { getInfo, login, logout, registering } from '../../api/user'
import { removeToken, setToken } from '../../utils/auth'

const getDefaultState = () => {
  return {
    access_token: '',
    account: ''
  }
}

const user = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    // 变更状态
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, accessToken) => {
      state.access_token = accessToken
    },
    SET_NAME: (state, account) => {
      state.account = account
    }
  },
  actions: {
    // 用户登录
    login ({ commit }, userInfo) {
      console.log(userInfo)
      const { account, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ account, password })
          .then((response) => {
            const { data } = response
            console.log(data)
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', data.nickname)
            setToken(data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    register ({ commit }, userInfo) {
      console.log(userInfo)
      const { account, password, password2, promoCode } = userInfo
      return new Promise((resolve, reject) => {
        registering({
          account,
          password,
          password2,
          promoCode
        })
          .then((response) => {
            const { data } = response
            console.log(response)
            console.log(data.account)
            resolve()
          })
          .catch((error) => reject(error))
      })
    },
    getInfo ({ commit }, token) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const { data } = response
            commit('SET_TOKEN', token)
            commit('SET_NAME', data.nickname)
            resolve()
          })
          .catch((error) => reject(error))
      })
    },
    // remove token
    resetToken ({ commit }) {
      return new Promise(resolve => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
      })
    },
    // user logout
    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
