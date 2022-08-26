import { CarCardTypes, CarFilterTypes } from 'types/car.dto'
import {
  CarFilterParamTypes,
  FilterRes,
  FilterResData,
} from 'types/request.dto'
import { request } from '../init'

const cars = {
  popular: (params?: { count?: number }) =>
    request.get('/car/popular', { params }),

  // data:[], total: 100, current: 30, page: 3, count: 10
  recommended: (params?: { page?: number; count?: number }) =>
    request.get('/car/recommended', { params }),
  recent: () => request.get('/car/recent'),

  filter: (params: CarFilterParamTypes): Promise<FilterResData> =>
    request.get('/car/filter', { params }).then((res) => res.data),

  details: (slug: string) => request.get('/car/detail/' + slug),
}
export default cars
