import {
  Box,
  Button,
  Checkbox,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import MyCard from 'components/MyCard'
import React from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import { FinalFormType, NextPrevBtnProps, StepContent } from 'types/rental.dto'
import BoxTitle from './BoxTitle'

interface StateType {
  newsLetter: boolean
  terms: boolean
}
interface FormType {
  form: {
    state: StateType
    setConfirm: (statePartial: Partial<StateType>) => void
  }
  finalForm: FinalFormType
}

const Confirmation = ({
  header,
  form,
  finalForm,
  prevStep,
}: Omit<StepContent<undefined>, 'form'> &
  FormType &
  Omit<NextPrevBtnProps, 'nextStep'>) => {
  const theme = useMantineTheme()
  const { state, setConfirm } = form

  const confirmRental = () => {
    console.log(finalForm)
    showNotification({
      color: 'green',
      title: 'Rental is submitted successfully',
      message:
        'Your car will be ready at the ' +
        finalForm.rentalInfo.date_from +
        ', you can pick it up in the ' +
        finalForm.rentalInfo.address_from +
        ' branch',
      autoClose: 10000,

      styles: (theme) => ({
        root: {
          boxShadow: theme.shadows.xl,
        },
        title: {
          fontSize: theme.fontSizes.lg,
          fontWeight: 600,
          marginBottom: 8,
        },
        description: {
          fontSize: theme.fontSizes.sm,
          marginBottom: 2,
          fontWeight: 500,
        },
      }),
    })
  }

  return (
    <MyCard>
      {header}
      <Stack mt='xl' spacing='lg'>
        <Accept
          type='newsLetter'
          checked={state.newsLetter}
          setConfirm={setConfirm}
          text='I agree with sending an Marketing and newsletter emails. No spam, promissed!'
        />
        <Accept
          type='terms'
          checked={state.terms}
          setConfirm={setConfirm}
          text='I agree with our terms and conditions and privacy policy.'
        />
        <Box>
          <Group>
            <Button variant='default' size='lg' radius='md' onClick={prevStep}>
              Back
            </Button>
            <Button
              size='lg'
              radius='md'
              disabled={!state.terms}
              onClick={confirmRental}
            >
              Rent Now
            </Button>
          </Group>
        </Box>
        <Box mt='xs'>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M25.0532 5.96007C24.1587 6.01119 23.2615 5.93941 22.3865 5.74674C21.3311 5.38534 20.344 4.84897 19.4665 4.16007C18.7159 3.62793 18.003 3.0443 17.3332 2.41341C17.0492 2.14815 16.6751 2.00061 16.2865 2.00061C15.8979 2.00061 15.5238 2.14815 15.2399 2.41341C14.5878 3.02435 13.9023 3.59857 13.1865 4.13341C12.3036 4.83136 11.3128 5.38079 10.2532 5.76007C9.25659 5.98526 8.23279 6.06608 7.2132 6.00007C6.37834 5.9655 5.54599 5.88538 4.71986 5.76007C4.51799 5.73015 4.31216 5.74118 4.11464 5.79251C3.91712 5.84384 3.73197 5.93442 3.57021 6.05885C3.40845 6.18328 3.2734 6.33901 3.17313 6.51675C3.07285 6.6945 3.00939 6.89061 2.98653 7.09341C2.91986 7.73341 2.74653 9.40007 2.66653 11.2534C2.55442 13.1051 2.67085 14.9635 3.0132 16.7867C3.97859 19.8074 5.75413 22.5053 8.14653 24.5867C10.0481 26.3804 12.1101 27.9961 14.3065 29.4134C14.8952 29.8176 15.5925 30.0339 16.3065 30.0339C17.0206 30.0339 17.7179 29.8176 18.3065 29.4134C20.3865 27.9591 22.3321 26.3215 24.1199 24.5201C26.3722 22.4234 28.0402 19.7766 28.9599 16.8401'
              stroke={
                theme.colorScheme === 'dark'
                  ? String(theme.colors.gray[5])
                  : String(theme.colors.dark[7])
              }
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M14.6667 14.6667L18.4801 18.48C18.5038 18.5059 18.5327 18.5265 18.5648 18.5406C18.5969 18.5548 18.6316 18.5621 18.6667 18.5621C18.7019 18.5621 18.7366 18.5548 18.7687 18.5406C18.8008 18.5265 18.8297 18.5059 18.8534 18.48L29.3334 8'
              stroke={String(theme.colors.indigo[6])}
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <BoxTitle
            title='All your data are safe'
            desc='We are using the most advanced security to provide you the best experience ever.'
          />
        </Box>
      </Stack>
    </MyCard>
  )
}

const Accept = ({
  text,
  type,
  checked,
  setConfirm,
}: {
  text: string
  type: 'newsLetter' | 'terms'
  checked: boolean
  setConfirm: (statePartial: Partial<StateType>) => void
}) => {
  const { classes } = useGlobalStyles()

  return (
    <Paper radius={12} py='md' px={30} className={classes.boxBg}>
      <Checkbox
        size='md'
        checked={checked}
        onChange={(val) => setConfirm({ [type]: val.target.checked })}
        label={
          <Text ml='xs' size='md' weight='bold'>
            {text}
          </Text>
        }
      />
    </Paper>
  )
}
export default Confirmation
