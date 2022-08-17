import { CarFilterParamTypes } from 'types/request.dto'
import { request } from '../init'

export const car = {
  popular: (params: { count?: number }) =>
    request.get('/car/popular', { params }),

  // data:[], total: 100, current: 30, page: 3, count: 10
  recommended: (params: { page?: number; count?: number }) =>
    request.get('/car/recommended', { params }),
  recent: () => request.get('/car/recent'),

  filter: (params: CarFilterParamTypes) =>
    request.get('/car/filter', { params }),

  details: (slug: string) => request.get('/car/detail/' + slug),
}
