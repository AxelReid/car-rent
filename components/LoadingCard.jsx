import { Skeleton } from '@mantine/core'
import React from 'react'
import MyCard from './MyCard'

const LoadingCard = () => {
  return (
    <MyCard style={{ aspectRatio: '1/1.25' }} p={0}>
      <Skeleton width='100%' height='100%' />
    </MyCard>
  )
}

export default LoadingCard
