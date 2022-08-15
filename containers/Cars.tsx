import { Box, Button, Center, Group, SimpleGrid, Text } from '@mantine/core'
import React, { memo } from 'react'
import cars from 'data/cars'
import CarCard from 'components/Car/CarCard'

type Props = {
  title?: string
  loadMore?: () => void
}

const Cars = memo(({ title, loadMore }: Props) => {
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
        {cars.map((car) => (
          <CarCard key={car.id} {...car} />
        ))}
      </SimpleGrid>
      {typeof loadMore === 'function' && (
        <Group pt={50} position='apart'>
          <div />
          <Button size='md'>Show more cars</Button>
          <Text color='dimmed'>120 Cars</Text>
        </Group>
      )}
    </Box>
  )
})
Cars.displayName = 'Cars'
export default Cars
