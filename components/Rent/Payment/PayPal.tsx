import { Grid, NumberInput, Text, TextInput } from '@mantine/core'
import React from 'react'
import useInputStyles from 'styles/useInputStyles'

interface Props {
  form: any
}

const PayPal = ({ form }: Props) => {
  const { classes, cx } = useInputStyles()
  return (
    <>
      <form onSubmit={form.onSubmit(console.log)}>
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
      </form>
    </>
  )
}

export default PayPal
