import { Container, DefaultProps } from '@mantine/core'
import React from 'react'

interface Props extends DefaultProps {
  children: React.ReactNode
}

const MyComp = (props: Props) => {
  return (
    <Container {...props} size='xl' style={{ position: 'relative' }}>
      {props.children}
    </Container>
  )
}

export default MyComp
