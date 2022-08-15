import { Box, Group, Text } from '@mantine/core'
import React from 'react'

type Props = {
  title: string
  desc: string
  step?: number
}

const BoxTitle = ({ title, desc, step }: Props) => {
  return (
    <Group position='apart' align='center'>
      <Box>
        <Text size='xl' weight='bold'>
          {title}
        </Text>
        <Text size='sm' color='dimmed' mt={4}>
          {desc}
        </Text>
      </Box>
      {step && (
        <Text size='sm' color='dimmed'>
          Step {step} of 4
        </Text>
      )}
    </Group>
  )
}

export default BoxTitle
