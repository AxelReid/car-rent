import { UseFormInput } from '@mantine/form/lib/types'
import React from 'react'

export interface StepType {
  title: string
  desc: string
  step: number
}
export interface StepContent {
  header: React.ReactNode
  form: any
}
export interface RentalInfoFormType {
  address_from: string | null
  date_from: Date | null
  time_from: string | null
  address_to: string | null
  date_to: Date | null
  time_to: Date | null
}
export interface NextPrevBtnProps {
  nextStep: () => void
  prevStep?: () => void
}
