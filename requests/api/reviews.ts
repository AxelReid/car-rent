import { request } from '../init'

export const reviews = {
  // data: [],total: 100, current: 30
  carReviews: ({ carSlug, ...params }: { carSlug: string; count?: number }) =>
    request.get(`/car/reviews/${carSlug}`, { params }),
}
