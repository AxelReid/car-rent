import init from 'requests/init'
import { request } from 'requests/request'
import { LoginType, SignUpType } from 'types/request.dto'

const auth = {
  login: (data: LoginType) => request.post('/token/login', data),
  signup: (data: SignUpType) => request.post('/auth/users/', data),
  logout: () =>
    init
      .post('/token/logout')
      .then((res) => console.log(res))
      .catch((err) => console.error(err)),
}
export default auth
