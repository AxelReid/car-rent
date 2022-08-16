import { Accordion, Box, Card, Group, Radio, Stack, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import React, { Dispatch, SetStateAction, useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import {
  CreditCardFormType,
  NextPrevBtnProps,
  PaypalFormType,
  StepContent,
} from 'types/rental.dto'
import ActionsBtns from '../ActionsBtns'
import CreditCard from './CreditCard'
import PayPal from './PayPal'

const panels = [
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
    tab: string | null
    setTab: Dispatch<SetStateAction<string | null>>
  }
}

const Payment = ({
  header,
  form,
  prevStep,
  nextStep,
}: Omit<StepContent<null>, 'form'> & NextPrevBtnProps & FormType) => {
  const { classes, cx } = useGlobalStyles()
  const [activeTab, setActiveTab] = useState<string | null>(
    form.tab || panels[0].key
  )

  const handleActiveTab = (val: string | null) => {
    setActiveTab(val)
    form.setTab(val)
  }

  const content: { [index: string]: any } = {
    creditCard: <CreditCard form={form.creditCard} />,
    paypal: <PayPal form={form.paypal} />,
    bitcoin: 'Bitcoin',
  }

  const submit = () => {
    nextStep()
  }

  return (
    <Card radius='lg' p='xl'>
      {header}
      <Stack my='xl' spacing='lg'>
        {panels.map((panel) => (
          <Card
            key={panel.key}
            radius={12}
            px='sm'
            py={4}
            className={cx(classes.boxBg)}
          >
            <Group p='md' onClick={() => handleActiveTab(panel.key)}>
              <Radio
                value={panel.key}
                checked={panel.key === activeTab}
                readOnly
              />
              <Text weight={600} size='md'>
                {panel.label}
              </Text>
            </Group>
            {activeTab === panel.key && (
              <Box p='md' pt={4}>
                {content[panel.key]}
              </Box>
            )}
          </Card>
        ))}
      </Stack>

      <ActionsBtns disabled={false} prevStep={prevStep} submit={submit} />
    </Card>
  )
}
export default Payment
