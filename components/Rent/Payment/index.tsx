import { Accordion, Box, Card, Group, Radio, Stack, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import MyCard from 'components/MyCard'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import {
  BitcoinFormType,
  CreditCardFormType,
  NextPrevBtnProps,
  PaymentTabValue,
  PaypalFormType,
  StepContent,
} from 'types/rental.dto'
import ActionsBtns from '../ActionsBtns'
import Bitcoin from './Bitcoin'
import CreditCard from './CreditCard'
import PayPal from './PayPal'

const panels: { key: PaymentTabValue; label: string }[] = [
  {
    key: 'creditCard',
    label: 'Credit Card',
  },
  {
    key: 'paypal',
    label: 'PayPal',
  },
  {
    key: 'bitcoin',
    label: 'Bitcoin',
  },
]

interface FormType {
  form: {
    creditCard: UseFormReturnType<CreditCardFormType>
    paypal: UseFormReturnType<PaypalFormType>
    bitcoin: UseFormReturnType<BitcoinFormType>
    tab: PaymentTabValue
    setTab: Dispatch<SetStateAction<PaymentTabValue>>
  }
}

const Payment = ({
  header,
  form,
  prevStep,
  nextStep,
}: Omit<StepContent<null>, 'form'> & NextPrevBtnProps & FormType) => {
  const { classes, cx } = useGlobalStyles()

  const content = {
    creditCard: {
      form: form.creditCard,
      component: <CreditCard form={form.creditCard} />,
    },
    paypal: { form: form.paypal, component: <PayPal form={form.paypal} /> },
    bitcoin: { form: form.bitcoin, component: <Bitcoin form={form.bitcoin} /> },
  }
  const invalid =
    Object.values(content[form.tab].form.values).findIndex((val) => !val) !== -1

  const handleTab = (key: PaymentTabValue) => {
    form.setTab(key)
  }

  const submit = () => {
    const { hasErrors } = content[form.tab].form?.validate()
    if (!hasErrors) nextStep()
  }

  return (
    <MyCard>
      {header}
      <form onSubmit={content[form.tab].form?.onSubmit(submit)}>
        <Stack mt='xl' spacing='lg'>
          {panels.map((panel) => (
            <Card
              key={panel.key}
              radius={12}
              px='sm'
              py={4}
              className={cx(classes.boxBg)}
            >
              <Group p='md' onClick={() => handleTab(panel.key)}>
                <Radio
                  value={panel.key}
                  checked={panel.key === form.tab}
                  readOnly
                />
                <Text weight={600} size='md'>
                  {panel.label}
                </Text>
              </Group>
              {form.tab === panel.key && (
                <Box p='md' pt={4}>
                  {content[panel.key].component}
                </Box>
              )}
            </Card>
          ))}
          <ActionsBtns disabled={invalid} prevStep={prevStep} submit={submit} />
        </Stack>
      </form>
    </MyCard>
  )
}
export default Payment
