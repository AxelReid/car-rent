import { useForm } from '@mantine/form'
import { useSetState } from '@mantine/hooks'
import { useState } from 'react'
import { RentalInfoFormType } from 'types/rental.dto'

const useRentalForms = () => {
  // STEP 1 - Billing Info
  const billingForm = useForm({
    initialValues: {
      name: '',
      address: '',
      phoneNumber: '',
      townOrCity: '',
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Provide a valid name!' : null),
      address: (value) =>
        value.length < 1 ? 'Provide a valid address!' : null,
      townOrCity: (value) =>
        value.length < 1 ? 'Provide a valid town or city!' : null,
      phoneNumber: (value) =>
        value?.length !== 11 ? 'Provide a valid phone number!' : null,
    },
  })

  // STEP 2 - Rental Info
  const [rentalFormState, setRentalFormState] = useSetState<RentalInfoFormType>(
    {
      address_from: null,
      date_from: null,
      time_from: null,

      address_to: null,
      date_to: null,
      time_to: null,
    }
  )
  const rentalInfoForm = {
    state: rentalFormState,
    setState: setRentalFormState,
  }

  // STEP 3 - Payment Method
  const [tab, setTab] = useState('')
  const paymentCreditCard = useForm({
    initialValues: {
      cardNumber: '',
      exp: '',
      cardHolder: '',
      cvc: '',
    },
    validate: {
      cardNumber: (value) =>
        value.length < 1 ? 'Provide a valid card!' : null,
      exp: (value) => (value.length < 1 ? 'Provide a valid exp!' : null),
      cardHolder: (value) => (value.length < 1 ? 'Provide a name' : null),
      cvc: (value) =>
        value?.length !== 11 ? 'Provide a valid cvc number!' : null,
    },
  })
  const paymentPaypal = useForm({
    initialValues: {
      cardNumber: '',
      cvc: '',
    },
    validate: {
      cardNumber: (value) =>
        value.length < 1 ? 'Provide a valid card!' : null,
      cvc: (value) =>
        value?.length !== 11 ? 'Provide a valid cvc number!' : null,
    },
  })
  const payment = {
    creditCard: paymentCreditCard,
    paypal: paymentPaypal,
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

  return { billingForm, rentalInfoForm, payment, confirmation }
}
export default useRentalForms
