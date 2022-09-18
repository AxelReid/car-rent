import { UploadImgType } from './default.dt'

export interface AddCarFormType {
  name: string
  car_type: string
  description: string
  images: UploadImgType[]
  price: number | null
  discount: number | null
  gasoline: number | null
  steering: 'manual' | 'auto'
  capacity: number | null
}
