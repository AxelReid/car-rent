import { request } from '../init'

const reviews = {
  // data: [],total: 100, current: 30
  carReviews: ({ carSlug, ...params }: { carSlug: string; count?: number }) =>
    request.get(`/car/reviews/${carSlug}`, { params }),
}
export default reviews
