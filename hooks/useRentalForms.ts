import { useForm } from '@mantine/form'
import { useSetState } from '@mantine/hooks'
import { useState } from 'react'
import {
  BillingFormType,
  BitcoinFormType,
  CreditCardFormType,
  PaymentTabValue,
  PaypalFormType,
  RentalInfoFormType,
} from 'types/rental.dto'

const useRentalForms = () => {
  // STEP 1 - Billing Info
  const billingForm = useForm<BillingFormType>({
    initialValues: {
      name: '',
      address: '',
      phoneNumber: 998,
      townOrCity: '',
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Provide a valid name!' : null),
      address: (value) =>
        value.length < 1 ? 'Provide a valid address!' : null,
      townOrCity: (value) =>
        value.length < 1 ? 'Provide a valid town or city!' : null,
      phoneNumber: (value) =>
        String(value).length !== 12 ? 'Provide a valid phone number!' : null,
    },
  })

  // STEP 2 - Rental Info
  const rentalForm = useForm<RentalInfoFormType>({
    initialValues: {
      address_from: '',
      date_from: null,
      time_from: null,

      address_to: '',
      date_to: null,
      time_to: null,
    },
    validate: {
      address_from: (value) =>
        value === null || String(value).length < 1
          ? 'Select a pick up address!'
          : null,
      date_from: (value: Date | null) =>
        value === null || String(value).length < 1
          ? 'Select a starting date!'
          : null,
      time_from: (value: Date | null) =>
        value === null || String(value).length < 1
          ? 'Select a starting time!'
          : null,

      address_to: (value) =>
        value.length < 1 ? 'Select a destination!' : null,
      date_to: (value: Date | null) =>
        value === null || String(value).length < 1
          ? 'Select an end date!'
          : null,
      time_to: (value: Date | null) =>
        value === null || String(value).length < 1
          ? 'Select an end time!'
          : null,
    },
  })

  // STEP 3 - Payment Method
  const [tab, setTab] = useState<PaymentTabValue>('creditCard')
  const paymentCreditCard = useForm<CreditCardFormType>({
    initialValues: {
      cardNumber: '',
      exp: '',
      cardHolder: '',
      cvc: '',
    },
    validate: {
      cardNumber: (value: number | string) =>
        !value || String(value).length < 1 ? 'Provide a valid card!' : null,
      exp: (value: number | string) =>
        !value || String(value).length < 1 ? 'Provide a valid exp!' : null,
      cardHolder: (value) =>
        !value || String(value).length < 1 ? 'Provide a name' : null,
      cvc: (value: number | string) =>
        String(value).length !== 3 ? 'Provide a valid cvc number!' : null,
    },
  })
  const paymentPaypal = useForm<PaypalFormType>({
    initialValues: {
      cardNumber: '',
      cvc: '',
    },
    validate: {
      cardNumber: (value: number | string) =>
        !value || String(value).length < 1
          ? 'Provide a valid card number!'
          : null,
      cvc: (value: number | string) =>
        String(value).length !== 3 ? 'Provide a valid cvc number!' : null,
    },
  })
  const paymentBitcoin = useForm<BitcoinFormType>({
    initialValues: { bitcoinAddress: '' },
    validate: {
      bitcoinAddress: (value) =>
        String(value).length > 34 || String(value).length < 25
          ? 'Provide a valid bitcoin address'
          : null,
    },
  })
  const payment = {
    creditCard: paymentCreditCard,
    paypal: paymentPaypal,
    bitcoin: paymentBitcoin,
    tab,
    setTab,
  }

  // STEP 4 - Confirmation
  const [confirm, setConfirm] = useSetState({
    newsLetter: false,
    terms: false,
  })
  const confirmation = {
    state: confirm,
    setConfirm,
  }

  return { billingForm, rentalForm, payment, confirmation }
}
export default useRentalForms
