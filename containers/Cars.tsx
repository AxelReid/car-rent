import { Box, Button, Group, SimpleGrid, Text } from '@mantine/core'
import React, { memo } from 'react'
import CarCard from 'components/Car/CarCard'
import { CarCardTypes, DataInfo } from 'types/car.dto'

type Props = {
  title?: string
  loadMore?: () => void
  info: DataInfo
  loading: boolean
  cars: CarCardTypes[]
}

const Cars = memo(({ title, loadMore, info, loading, cars }: Props) => {
  const totalPages = Math.ceil(info.total / info.current)

  return (
    <Box>
      {title && (
        <Text
          m='md'
          mb='xl'
          size='md'
          weight={600}
          sx={(theme) => ({ color: theme.colors.text2[0] })}
        >
          {title}
        </Text>
      )}
      <SimpleGrid
        cols={5}
        spacing='xl'
        breakpoints={[
          { maxWidth: 1500, cols: 4, spacing: 'lg' },
          { maxWidth: 1100, cols: 3, spacing: 'md' },
          { maxWidth: 800, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {cars.map((car, i) => (
          <CarCard key={i} {...car} />
        ))}
      </SimpleGrid>
      {typeof loadMore === 'function' && (
        <Group pt={50} position='apart'>
          <div />
          {info?.total > info?.current && (
            <Button onClick={loadMore} size='md' loading={loading}>
              Show more cars
            </Button>
          )}
          <Text color='dimmed'>
            {info?.current} / {info?.total || 0} Car{info?.total > 1 ? 's' : ''}
          </Text>
        </Group>
      )}
    </Box>
  )
})
Cars.displayName = 'Cars'
export default Cars
