import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'

const store = createStore({
  getters,
  modules: {
    user
  }
})

export default store
