import { Button, Group } from '@mantine/core'
import React from 'react'

type Props = {
  submit?: (any?: any) => void
  prevStep?: () => void
  disabled: boolean
}

const ActionsBtns = ({ prevStep, submit, disabled = false }: Props) => {
  const is_prev = typeof prevStep === 'function'
  const is_next = typeof submit === 'function'

  return (
    <Group
      position={
        is_prev && is_next ? 'apart' : is_prev && !is_next ? 'left' : 'right'
      }
      align='center'
    >
      {is_prev && (
        <Button size='lg' radius='md' variant='default' onClick={prevStep}>
          Back
        </Button>
      )}
      {is_next && (
        <Button
          disabled={disabled}
          size='lg'
          radius='md'
          type='submit'
          onClick={submit}
        >
          Next
        </Button>
      )}
    </Group>
  )
}

export default ActionsBtns
