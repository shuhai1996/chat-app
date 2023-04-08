const getters = {
  username: (state) => state.user.account,
  token: (state) => state.user.access_token
}
export default getters
