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
export interface NextPrevBtnProps {
  nextStep: () => void
  prevStep?: () => void
}
export interface RentalInfoFormType {
  address_from: string
  date_from: Date | null
  time_from: string | null
  address_to: string
  date_to: Date | null
  time_to: Date | null
}
export interface BillingFormType {
  name: string
  address: string
  phoneNumber: number
  townOrCity: string
}
export interface CreditCardFormType {
  cardNumber: number | string
  exp: number | string
  cardHolder: string
  cvc: number | string
}
export interface PaypalFormType {
  cardNumber: number | string
  cvc: number | string
}
export interface BitcoinFormType {
  bitcoinAddress: string
}
export type PaymentTabValue = 'creditCard' | 'paypal' | 'bitcoin'
export interface FinalFormType {
  billing: BillingFormType
  rentalInfo: RentalInfoFormType
  payment: CreditCardFormType | PaypalFormType | BitcoinFormType
  paymentType: PaymentTabValue
}
