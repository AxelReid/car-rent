import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Grid, Stepper } from '@mantine/core'
import RentalCar from 'components/Rent/RentalCar'
import MyComp from 'containers/MyComp'
import useRentalForms from 'hooks/useRentalForms'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'

const Billing = dynamic(() => import('components/Rent/Billing'))
const RentalInfo = dynamic(() => import('components/Rent/RentalInfo'))
const Payment = dynamic(() => import('components/Rent/Payment'))
const Confirmation = dynamic(() => import('components/Rent/Confirmation'))
const BoxTitle = dynamic(() => import('components/Rent/BoxTitle'))

const CarRent = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const { billingForm, rentalInfoForm, payment, confirmation } =
    useRentalForms()

  const steps = [
    {
      title: 'Billing Info',
      desc: 'Please enter your billing info',
      render: (header: React.ReactNode) => (
        <Billing
          form={billingForm}
          header={header}
          nextStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: 'Rental Info',
      desc: 'Please select your rental date',
      render: (header: React.ReactNode) => (
        <RentalInfo
          form={rentalInfoForm}
          header={header}
          nextStep={() => setCurrentStep(2)}
          prevStep={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: 'Payment Method',
      desc: 'Please enter your payment method',
      render: (header: React.ReactNode) => (
        <Payment
          form={payment}
          header={header}
          nextStep={() => setCurrentStep(3)}
          prevStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: 'Confirmation',
      desc: 'We are getting to the end. Just few clicks and your rental is ready!',
      render: (header: React.ReactNode) => (
        <Confirmation
          form={confirmation}
          header={header}
          prevStep={() => setCurrentStep(2)}
        />
      ),
    },
  ]

  return (
    <>
      <MyHeader />
      <MyComp my={30}>
        <Stepper
          color='indigo'
          style={{ flex: 1 }}
          active={currentStep}
          breakpoint='sm'
        >
          {steps.map((step, i) => (
            <Stepper.Step
              key={i}
              label={'Step ' + (i + 1)}
              description={step.title}
            />
          ))}
        </Stepper>
        <Grid gutter={30} mt='xl'>
          <Grid.Col span={12} md={6.5} lg={7.5}>
            {steps[currentStep].render(
              <BoxTitle
                title={steps[currentStep].title}
                desc={steps[currentStep].desc}
                step={currentStep + 1}
              />
            )}
          </Grid.Col>
          <Grid.Col span={12} md={5.5} lg={4.5}>
            <RentalCar />
          </Grid.Col>
        </Grid>
      </MyComp>
      <MyFooter />
    </>
  )
}

export default CarRent
