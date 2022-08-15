export interface LoginType {
  username?: string
  email?: string
  password: string
}
export interface SignUpType {
  username: string
  email: string
  password: string
  confirm_password: string
}

// car/filter
export interface CarFilterParamTypes {
  sort?: string //'popular|capacity|desc|esc'
  capacity?: number
  min?: number
  max?: number
  type?: string
}
