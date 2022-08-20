import { Dispatch, SetStateAction } from 'react'

export interface SidebarToggleType {
  opened?: boolean
  toggleOpen?: Dispatch<SetStateAction<boolean>>
}
