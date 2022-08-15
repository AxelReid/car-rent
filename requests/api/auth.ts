import { LoginType, SignUpType } from 'types/request.dto'
import axios_init from '../axios_init'

export const auth = {
  login: (data: LoginType) => axios_init.post({ url: 'user/login', data }),
  signup: (data: SignUpType) => axios_init.post({ url: 'user/signup', data }),
}
