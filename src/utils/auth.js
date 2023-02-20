import Cookies from 'js-cookie'

const TokenKey = "Authorization-Token";

export function setCookie(key, value) {
  return Cookies.set(key, value)
}

export function getCookie(key) {
  return Cookies.get(key)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
