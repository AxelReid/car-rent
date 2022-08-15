import {
  Box,
  Card,
  createStyles,
  Grid,
  Group,
  Indicator,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
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
  LocationMarkerIcon,
} from '@heroicons/react/outline'
import ActionsBtns from './ActionsBtns'

const useStyles = createStyles((theme, _params) => ({
  indicator: {
    borderWidth: 4,
    borderColor:
      theme.colorScheme === 'dark'
        ? 'rgba(37,38,43,0.7)'
        : 'rgba(255,255,255,0.8)',
  },
}))

interface FormType {
  form: {
    state: RentalInfoFormType
    setState: (statePartial: Partial<RentalInfoFormType>) => void
  }
}
type handleFuncFieldType =
  | 'address_from'
  | 'address_to'
  | 'time_from'
  | 'time_to'

const Rental = ({
  header,
  form,
  nextStep,
  prevStep,
}: Omit<StepContent, 'form'> & FormType & NextPrevBtnProps) => {
  const { state, setState } = form

  const handleDate = (values: [Date, Date]) => {
    setState({ date_from: values[0], date_to: values[1] })
  }
  function handleIt(field: handleFuncFieldType, value: any) {
    setState({ [field]: value })
  }

  const submit = () => {
    nextStep()
  }

  return (
    <Card radius='lg' p='xl'>
      {header}
      <Box my='xl'>
        <Group align='start' spacing='xl'>
          <RangeCalendar
            value={[state.date_from, state.date_to]}
            onChange={handleDate}
            excludeDate={(date) => date.getTime() < new Date().getTime()}
          />
          <Stack style={{ flex: 1, minWidth: 350 }} spacing={35}>
            <RentalAddress
              handleIt={handleIt}
              fields={{ address: 'address_from', time: 'time_from' }}
              values={{
                address: state.address_from,
                time: state.time_from,
                date: state.date_from,
              }}
              title='Pick-Up'
              date={state.date_from}
            />
            <RentalAddress
              handleIt={handleIt}
              fields={{ address: 'address_to', time: 'time_to' }}
              values={{
                address: state.address_to,
                time: state.time_to,
                date: state.date_to,
              }}
              title='Drop-Off'
              date={state.date_to}
            />
          </Stack>
        </Group>
      </Box>
      <ActionsBtns disabled={false} submit={submit} prevStep={prevStep} />
    </Card>
  )
}

interface RentalAddressTypes {
  date: Date | null
  title: 'Pick-Up' | 'Drop-Off'
  handleIt: <T>(field: handleFuncFieldType, value: T | null) => void
  fields: {
    time: 'time_from' | 'time_to'
    address: 'address_from' | 'address_to'
  }
}
interface ValuesType {
  values: {
    address: string | null
    time: any
    date: Date | null
  }
}

const RentalAddress = ({
  date,
  fields,
  values,
  title,
  handleIt,
}: RentalAddressTypes & ValuesType) => {
  const { classes } = useStyles()
  const { classes: cls } = useInputStyles()

  return (
    <Box>
      <Box pl={7}>
        <Indicator
          position='middle-start'
          color={title === 'Pick-Up' ? 'blue' : 'cyan'}
          withBorder
          inline
          size={17}
          classNames={{ indicator: classes.indicator }}
        >
          <Text ml='md' size='md'>
            {title}
          </Text>
        </Indicator>
      </Box>
      <Select
        icon={<LocationMarkerIcon width={20} />}
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
        onChange={(value) => handleIt(fields.address, value)}
        value={values.address}
      />
      <Grid mt='sm'>
        <Grid.Col span={6}>
          <TextInput
            icon={<CalendarIcon width={20} />}
            value={date ? new Date(date).toDateString() : ''}
            variant='filled'
            size='md'
            label={<Text className={cls.label}>Date</Text>}
            classNames={{ input: cls.input }}
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
            onChange={(value) => handleIt(fields.time, value)}
            value={values.time}
          />
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default Rental
