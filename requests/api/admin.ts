import { UploadImgType } from 'types/default.dt'
import { request } from '../request'

const admin = {
  getImages: (): Promise<UploadImgType[]> =>
    request.get('/all/images').then((res) => res.data),
}
export default admin
