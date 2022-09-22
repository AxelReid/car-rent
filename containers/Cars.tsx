import { Box, Button, Group, SimpleGrid, Text } from '@mantine/core'
import React, { memo } from 'react'
import CarCard from 'components/Car/CarCard'
import { CarCardTypes, DataInfo } from 'types/car.dto'
import LoadingCard from 'components/LoadingCard'
import emptyArr from 'utils/emptyArr'

type Props = {
  title?: string
  loadMore?: () => void
  info: DataInfo
  loading: boolean
  initLoading?: boolean
  cars: CarCardTypes[]
}

const Cars = memo(
  ({ initLoading, title, loadMore, info, loading, cars }: Props) => {
    if (!initLoading && cars.length < 1) return null
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
          {loading
            ? emptyArr(10).map((obj) => <LoadingCard key={obj.id} />)
            : cars.map((car, i) => <CarCard key={i} {...car} />)}
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
              {info?.current} / {info?.total || 0} Car
              {info?.total > 1 ? 's' : ''}
            </Text>
          </Group>
        )}
      </Box>
    )
  }
)
Cars.displayName = 'Cars'
export default Cars
