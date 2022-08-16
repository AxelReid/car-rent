import { UseFormInput, UseFormReturnType } from '@mantine/form/lib/types'
import React from 'react'

export interface StepType {
  title: string
  desc: string
  step: number
}
export interface StepContent<T> {
  header: React.ReactNode
  form: UseFormReturnType<T>
}
export interface RentalInfoFormType {
  address_from: string
  date_from: Date | null
  time_from: string | null
  address_to: string
  date_to: Date | null
  time_to: Date | null
}
export interface NextPrevBtnProps {
  nextStep: () => void
  prevStep?: () => void
}
export interface CreditCardFormType {
  cardNumber: number
  exp: number
  cardHolder: string
  cvc: number
}
export interface PaypalFormType {
  cardNumber: number
  cvc: number
}
export interface BillingFormType {
  name: string
  address: string
  phoneNumber: number
  townOrCity: string
}
