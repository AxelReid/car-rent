import { Dispatch, SetStateAction } from 'react'

export interface SidebarToggleType {
  opened?: boolean
  toggleOpen?: Dispatch<SetStateAction<boolean>>
}
export interface UploadImgType {
  id: number
  path: string
}
export type Permission_types = 'USER' | 'SELLER' | 'ADMIN'
