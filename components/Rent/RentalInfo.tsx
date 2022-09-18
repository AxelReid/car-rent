import { Box, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core'
import React from 'react'
import {
  NextPrevBtnProps,
  RentalInfoFormType,
  StepContent,
} from 'types/rental.dto'
import { RangeCalendar, TimeInput } from '@mantine/dates'
import useInputStyles from 'styles/useInputStyles'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import ActionsBtns from './ActionsBtns'
import MyCard from 'components/MyCard'
import TextIndicator from 'components/TextIndicator'

const Rental = ({
  header,
  form,
  nextStep,
  prevStep,
}: StepContent<RentalInfoFormType> & NextPrevBtnProps) => {
  const submit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) nextStep()
  }

  const handleDate = (value: [Date, Date]) => {
    form.setValues({ ...form.values, date_from: value[0], date_to: value[1] })
  }

  return (
    <MyCard>
      {header}
      <form onSubmit={form.onSubmit(submit)}>
        <Box my='xl'>
          <Group align='start' spacing='xl'>
            <RangeCalendar
              value={[form.values.date_from, form.values.date_to]}
              onChange={handleDate}
              excludeDate={(date) => date.getTime() < new Date().getTime()}
            />
            <Stack style={{ flex: 1, minWidth: 350 }} spacing={35}>
              <RentalAddress
                title='Pick-Up'
                form={form}
                fields={{
                  address: 'address_from',
                  time: 'time_from',
                  date: 'date_from',
                }}
              />
              <RentalAddress
                title='Drop-Off'
                form={form}
                fields={{
                  address: 'address_to',
                  time: 'time_to',
                  date: 'date_to',
                }}
              />
            </Stack>
          </Group>
        </Box>
        <ActionsBtns
          disabled={Object.values(form.values).findIndex((val) => !val) !== -1}
          submit={submit}
          prevStep={prevStep}
        />
      </form>
    </MyCard>
  )
}

interface RentalAddressTypes {
  title: 'Pick-Up' | 'Drop-Off'
  fields: {
    time: 'time_from' | 'time_to'
    address: 'address_from' | 'address_to'
    date: 'date_from' | 'date_to'
  }
}

const RentalAddress = ({
  fields,
  title,
  form,
}: RentalAddressTypes & Omit<StepContent<RentalInfoFormType>, 'header'>) => {
  const { classes: cls } = useInputStyles()

  return (
    <Box>
      <TextIndicator
        color={title === 'Pick-Up' ? 'blue' : 'cyan'}
        title={title}
      />
      <Select
        icon={<MapPinIcon width={20} />}
        mt='lg'
        variant='filled'
        size='md'
        searchable
        clearable
        label={<Text className={cls.label}>Address</Text>}
        classNames={{ input: cls.input }}
        data={[
          { value: 'andijan', label: 'Andijan' },
          { value: 'tashkent', label: 'Tashkent' },
        ]}
        nothingFound='No options'
        {...form.getInputProps(fields.address)}
      />
      <Grid mt='sm'>
        <Grid.Col span={6}>
          <TextInput
            icon={<CalendarIcon width={20} />}
            variant='filled'
            size='md'
            label={<Text className={cls.label}>Date</Text>}
            classNames={{ input: cls.input }}
            error={
              fields.date === 'date_from'
                ? form.values.date_from
                  ? null
                  : form.errors?.date_from
                : form.values.date_to
                ? null
                : form.errors?.date_to
            }
            value={
              fields.date === 'date_from'
                ? form.values.date_from
                  ? new Date(form.values.date_from).toDateString()
                  : ''
                : form.values.date_to
                ? new Date(form.values.date_to).toDateString()
                : ''
            }
            readOnly
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TimeInput
            icon={<ClockIcon width={20} />}
            clearable
            variant='filled'
            size='md'
            label={<Text className={cls.label}>Time</Text>}
            classNames={{ input: cls.input }}
            {...form.getInputProps(fields.time)}
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default Rental
