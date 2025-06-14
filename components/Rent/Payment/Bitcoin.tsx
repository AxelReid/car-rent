import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Text, TextInput, Tooltip } from '@mantine/core'
import React from 'react'
import useInputStyles from 'styles/useInputStyles'
import { BitcoinFormType, StepContent } from 'types/rental.dto'

const Bitcoin = ({ form }: Omit<StepContent<BitcoinFormType>, 'header'>) => {
  const { classes, cx } = useInputStyles()
  return (
    <TextInput
      size='md'
      label={<Text className={classes.label}>Bitcoin Address</Text>}
      placeholder='Bitcoin address'
      variant='filled'
      {...form.getInputProps('bitcoinAddress')}
      classNames={{ input: cx(classes.input, classes.inputBgDarker) }}
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
