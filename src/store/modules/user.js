import { login, registering } from "../../api/user";
import { setToken } from "../../utils/auth";

const getDefaultState = () => {
  return {
    access_token: "",
    account: "",
  };
};

const user = {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    // 变更状态
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, access_token) => {
      state.access_token = access_token;
    },
    SET_NAME: (state, account) => {
      state.account = account;
    },
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      console.log(userInfo);
      const { account, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ account: account, password: password })
          .then((response) => {
            const { data } = response;
            console.log(response);
            console.log(data.data.token);
            console.log(data.data.account);
            commit("SET_TOKEN", data.data.token);
            commit("SET_NAME", data.data.account);
            setToken(data.data.token);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    register(commit, userInfo) {
      console.log(userInfo);
      const { account, password, password2, promo_code } = userInfo;
      return new Promise((resolve, reject) => {
        registering({
          account: account,
          password: password,
          password2: password2,
          promo_code: promo_code,
        })
          .then((response) => {
            const { data } = response;
            console.log(response);
            console.log(data.data.account);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
  },
};

export default user;
