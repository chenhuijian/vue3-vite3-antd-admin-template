import Cookies from 'js-cookie'

// const TokenKey = 'AUTH_TICKET'
const TokenKey = 'AUTHORIZATION'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
