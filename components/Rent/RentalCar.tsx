import { Box, Card, Divider, Group, Stack, Text } from '@mantine/core'
import Star from 'components/Star'
import Image from 'next/image'
import React, { memo } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'

const RentalCar = memo(() => {
  const { classes } = useGlobalStyles()
  return (
    <Card radius='lg' p='xl'>
      <Text size='xl' weight='bold'>
        Rental Summary
      </Text>
      <Text color='dimmed' size='sm' mt='xs'>
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </Text>
      <Group spacing='lg' mt='lg'>
        <Image
          src='/imgs/card1car.png'
          width={250}
          height={140}
          objectFit='contain'
          alt='car'
        />
        <Box mb='md'>
          <Text size={32} weight='bold'>
            Nissan GT-R
          </Text>
          <Group>
            <Star rating={4} />
            <Text className={classes.secondary_color}>440 Reviews</Text>
          </Group>
        </Box>
      </Group>
      <Divider />
      <Stack mt='lg'>
        <Group position='apart' align='center'>
          <Text size='md' color='dimmed' weight={600}>
            Subtotal
          </Text>
          <Text size='md' weight={600}>
            $80.00
          </Text>
        </Group>
        <Group position='apart' align='center'>
          <Text size='md' color='dimmed' weight={600}>
            Tax
          </Text>
          <Text size='md' weight={600}>
            $0
          </Text>
        </Group>
        <Group position='apart' align='center' mt='lg'>
          <Box>
            <Text weight='bold' size='xl'>
              Total Rental Price
            </Text>
            <Text size='sm'>Overall price and includes rental discount</Text>
          </Box>
          <Text size={32} weight='bold'>
            $80.00
          </Text>
        </Group>
      </Stack>
    </Card>
  )
})
RentalCar.displayName = 'RentalCar'
export default RentalCar
