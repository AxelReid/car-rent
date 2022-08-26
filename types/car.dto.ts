export interface CarSpecs {
  gasoline: string
  steering: string
  capacity: number
}

export interface CarCardTypes {
  id?: string
  slug?: string
  in_wishlist: boolean
  name: string
  car_type: {
    key: string
    name: string
  }
  image: string
  specs: CarSpecs
  price: string
  discount?: string | null
}

export interface CarDetails extends Omit<CarCardTypes, 'image'> {
  description: string
  images: Array<string>
  rating: {
    average: number
    total: number
  }
}

// params = car_id
export interface CarReviews {
  page: number
  total: number
  current: number
  data: CarReview[]
}

export interface CarReview {
  id?: string
  date: string
  rating: number
  content: string
  user: {
    avatar: string
    name: string
    bio: string
  }
}
export interface DataInfo {
  total: number
  current: number
  page: number
}
export type Recommended = CarCardTypes[]
export type Recent = CarCardTypes[]

// filter
export type FilterSortType = 'popular' | 'new' | 'desc' | 'asc'
export interface CarFilterTypes {
  sort?: { label: FilterSortType; selected: boolean }[]
  capacity?: { label: number; selected: boolean }[]
  price?: { min?: number; max?: number }
  type?: { label: string; selected: boolean; total: number }[]
}
