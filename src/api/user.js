import request from '../utils/request'

export function login (data) {
  return request({
    url: '/user/chat/login',
    method: 'post',
    data
  })
}

export function registering (data) {
  return request({
    url: '/user/chat/register',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/user/chat/getinfo',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/chat/logout',
    method: 'post'
  })
}
