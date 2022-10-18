/**
 * 是否为URL
 * @param path
 * @returns {boolean}
 */
export function isUrl(path) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 是否为密码
 * @param password
 * @returns {boolean}
 */
export function isPassword(password) {
  const reg = /^([~!@#$%^&*_]|[a-zA-Z0-9]){6,}$/
  return reg.test(password)
}
