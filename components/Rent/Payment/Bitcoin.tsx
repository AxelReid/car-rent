import { InformationCircleIcon } from '@heroicons/react/outline'
import { Box, Input, Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import useInputStyles from 'styles/useInputStyles'
import { BitcoinFormType, StepContent } from 'types/rental.dto'

const Bitcoin = ({ form }: Omit<StepContent<BitcoinFormType>, 'header'>) => {
  const { classes, cx } = useInputStyles()
  return (
    <Input
      size='md'
      label={<Text className={classes.label}>Bitcoin Address</Text>}
      placeholder='Bitcoin address'
      variant='filled'
      {...form.getInputProps('bitcoinAddress')}
      classNames={{ input: cx(classes.input, classes.input2bg) }}
      rightSection={
        <Tooltip
          label='Bitcoin address should be between 25 and 34 char length'
          withArrow
          position='top-end'
        >
          <InformationCircleIcon width={20} style={{ display: 'block' }} />
        </Tooltip>
      }
    />
  )
}

export default Bitcoin
