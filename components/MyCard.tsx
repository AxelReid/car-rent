import { Card, DefaultProps } from '@mantine/core'
import React from 'react'

interface Props extends DefaultProps {
  children?: React.ReactNode
}

const MyCard = (props: Props) => {
  return (
    <Card radius='lg' p='xl' {...props}>
      {props.children}
    </Card>
  )
}

export default MyCard
