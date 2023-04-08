import router from './router'
import { getToken } from './utils/auth' // get token from cookie
import store from './store'
const whiteList = ['/chat', '/'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    const hasGetUserInfo = store.getters.username
    if (hasGetUserInfo) {
      next()
    } else {
      try {
        // get user info
        await store.dispatch('user/getInfo', hasToken)
        if (to.path === '/chat') {
          next({ path: '/chatroom' })
        } else {
          next()
        }
      } catch (error) {
        // remove token and go to login page to re-login
        console.log(error)
        await store.dispatch('user/resetToken')
        next({ path: '/chat' })
      }
    }
  } else {
    /* has no token */

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: '/' })
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
