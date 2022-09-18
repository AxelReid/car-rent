import { AddCarType, CarCardTypes, CarDetails } from 'types/car.dto'
import { CarFilterParamTypes, FilterResData } from 'types/request.dto'
import { request } from '../request'

const cars = {
  popular: (params?: { page?: string }): Promise<{ data: CarCardTypes[] }> =>
    request.get('/car/popular', { params }).then((res) => res.data),

  // data:[], total: 100, current: 30, page: 3, count: 10
  recommended: (params?: { page?: number; count?: number }) =>
    request.get('/car/recommended', { params }),
  recent: () => request.get('/car/recent'),

  filter: (params: CarFilterParamTypes): Promise<FilterResData> =>
    request.get('/car/filter', { params }).then((res) => res.data),

  slugs: (count: number = 10): Promise<{ slug: string }[]> =>
    request.get('/car/slugs?count=' + count).then((res) => res.data),
  details: (
    slug: string | string[]
  ): Promise<{
    status: number
    message: 'success' | 'failure'
    data: CarDetails
  }> => request.get('/car/detail/' + slug).then((res) => res.data),
  add: (data: AddCarType): Promise<{ status: number; message: string }> =>
    request.post('/car/add', data).then((res) => res.data),
}
export default cars
