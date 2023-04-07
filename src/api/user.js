import request from "../utils/request";

export function login(data) {
  return request({
    url: "/user/chat/login",
    method: "post",
    data,
  });
}

export function registering(data) {
  return request({
    url: "/user/chat/register",
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
