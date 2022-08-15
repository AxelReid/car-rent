import { Grid, NumberInput, Text, TextInput } from '@mantine/core'
import React from 'react'
import useInputStyles from 'styles/useInputStyles'

interface Props {
  form: any
}

const CreditCard = ({ form }: Props) => {
  const { classes, cx } = useInputStyles()
  return (
    <>
      <form onSubmit={form.onSubmit(console.log)}>
        <Grid gutter={30}>
          <Grid.Col span={12} sm={6} md={12} lg={6}>
            <NumberInput
              size='md'
              label={<Text className={classes.label}>Card Number</Text>}
              placeholder='Card number'
              variant='filled'
              {...form.getInputProps('cardNumber')}
              classNames={{ input: cx(classes.input, classes.input2bg) }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={12} lg={6}>
            <NumberInput
              size='md'
              label={<Text className={classes.label}>Expiration Date</Text>}
              placeholder='DD/MM/YY'
              variant='filled'
              {...form.getInputProps('exp')}
              classNames={{ input: cx(classes.input, classes.input2bg) }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={12} lg={6}>
            <TextInput
              size='md'
              label={<Text className={classes.label}>Card Holder</Text>}
              placeholder='Card holder'
              variant='filled'
              {...form.getInputProps('cardHolder')}
              classNames={{ input: cx(classes.input, classes.input2bg) }}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={12} lg={6}>
            <TextInput
              size='md'
              label={<Text className={classes.label}>CVC</Text>}
              variant='filled'
              placeholder='CVC'
              {...form.getInputProps('cvc')}
              classNames={{ input: cx(classes.input, classes.input2bg) }}
            />
          </Grid.Col>
        </Grid>
      </form>
    </>
  )
}

export default CreditCard
