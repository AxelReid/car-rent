import { Accordion, Card, Group, Radio, Stack, Text } from '@mantine/core'
import React, { useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import { NextPrevBtnProps, StepContent } from 'types/rental.dto'
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

const Payment = ({
  header,
  form,
  prevStep,
  nextStep,
}: StepContent & NextPrevBtnProps) => {
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
        <Accordion
          radius={12}
          variant='separated'
          chevronPosition='right'
          chevron={null}
          value={activeTab}
          onChange={(val) => handleActiveTab(val)}
        >
          {panels.map((panel) => (
            <Accordion.Item
              px='sm'
              py={4}
              className={cx(classes.boxBg, classes.boxBg_active)}
              key={panel.key}
              value={panel.key}
            >
              <Accordion.Control>
                <Group>
                  <Radio
                    value={panel.key}
                    checked={panel.key === activeTab}
                    readOnly
                  />
                  <Text weight={600} size='md'>
                    {panel.label}
                  </Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>{content[panel.key]}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
      <ActionsBtns disabled={false} prevStep={prevStep} submit={submit} />
    </Card>
  )
}
export default Payment
