import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  NumberInput,
  Text,
  TextInput,
} from '@mantine/core'
import React from 'react'
import { NextPrevBtnProps, StepContent } from 'types/rental.dto'
import useInputStyles from 'styles/useInputStyles'
import ActionsBtns from './ActionsBtns'

const Billing = ({
  header,
  form,
  nextStep,
}: StepContent & Omit<NextPrevBtnProps, 'prevStep'>) => {
  const { classes } = useInputStyles()

  const submit = () => {
    nextStep()
  }

  return (
    <Card radius='lg' p='xl'>
      {header}
      <Box my='xl'>
        <form onSubmit={form.onSubmit(console.log)}>
          <Grid gutter={30}>
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
        </form>
      </Box>
      <ActionsBtns disabled={false} submit={submit} />
    </Card>
  )
}
export default Billing
