import { Grid, NumberInput, Text } from '@mantine/core'
import React from 'react'
import useInputStyles from 'styles/useInputStyles'
import { PaypalFormType, StepContent } from 'types/rental.dto'

const PayPal = ({ form }: Omit<StepContent<PaypalFormType>, 'header'>) => {
  const { classes, cx } = useInputStyles()
  return (
    <>
      <Grid gutter={30}>
        <Grid.Col span={12} sm={8} md={12} lg={8}>
          <NumberInput
            size='md'
            label={<Text className={classes.label}>Card Number</Text>}
            placeholder='Card number'
            variant='filled'
            {...form.getInputProps('cardNumber')}
            classNames={{ input: cx(classes.input, classes.input2bg) }}
          />
        </Grid.Col>
        <Grid.Col span={12} sm={4} md={12} lg={4}>
          <NumberInput
            size='md'
            label={<Text className={classes.label}>CVC</Text>}
            placeholder='CVC'
            variant='filled'
            {...form.getInputProps('cvc')}
            classNames={{ input: cx(classes.input, classes.input2bg) }}
          />
        </Grid.Col>
      </Grid>
    </>
  )
}

export default PayPal
