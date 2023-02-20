import request from "../utils/request";

export function login(data) {
  console.log(data)
  return request({
    url: "/user/chat/login",
    method: "post",
    data,
  });
}

export function getInfo(params) {
  return request({
    url: "/user/chat/getinfo",
    method: "get",
    params
  });
}

export function logout() {
  return request({
    url: "/game/user/chat/logout",
    method: "post",
  });
}
