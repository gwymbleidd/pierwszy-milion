export default {
  checkAuth () {
    return window.localStorage.getItem('isLogged')
  },
  login (token) {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('isLogged', 'true')
  },
  logout () {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('isLogged')
  },
  getToken () {
    return window.localStorage.getItem('token')
  }
}
