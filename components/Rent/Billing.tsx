import { Box, Card, Grid, NumberInput, Text, TextInput } from '@mantine/core'
import React from 'react'
import {
  BillingFormType,
  NextPrevBtnProps,
  StepContent,
} from 'types/rental.dto'
import useInputStyles from 'styles/useInputStyles'
import ActionsBtns from './ActionsBtns'
import MyCard from 'components/MyCard'

const Billing = ({
  header,
  form,
  nextStep,
}: StepContent<BillingFormType> & Omit<NextPrevBtnProps, 'prevStep'>) => {
  const { classes } = useInputStyles()

  const submit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) nextStep()
  }
  return (
    <MyCard>
      {header}
      <Box mt='xl'>
        <form onSubmit={form.onSubmit(submit)}>
          <Grid gutter={30} mb='xl'>
            <Grid.Col span={12} sm={6} md={12} lg={6}>
              <TextInput
                size='md'
                label={<Text className={classes.label}>Name</Text>}
                placeholder='Your name'
                variant='filled'
                {...form.getInputProps('name')}
                classNames={{ input: classes.input }}
              />
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={12} lg={6}>
              <NumberInput
                size='md'
                label={<Text className={classes.label}>Phone Number</Text>}
                placeholder='Phone number'
                variant='filled'
                {...form.getInputProps('phoneNumber')}
                classNames={{ input: classes.input }}
              />
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={12} lg={6}>
              <TextInput
                size='md'
                label={<Text className={classes.label}>Address</Text>}
                placeholder='Address'
                variant='filled'
                {...form.getInputProps('address')}
                classNames={{ input: classes.input }}
              />
            </Grid.Col>
            <Grid.Col span={12} sm={6} md={12} lg={6}>
              <TextInput
                size='md'
                label={<Text className={classes.label}>Town/City</Text>}
                variant='filled'
                placeholder='Town or city'
                {...form.getInputProps('townOrCity')}
                classNames={{ input: classes.input }}
              />
            </Grid.Col>
          </Grid>
          <ActionsBtns
            disabled={
              Object.values(form.values).findIndex((val) => !val) !== -1
            }
            submit={submit}
          />
        </form>
      </Box>
    </MyCard>
  )
}
export default Billing
