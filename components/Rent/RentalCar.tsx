import { PhotoIcon } from '@heroicons/react/24/outline'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Box, Divider, Group, Skeleton, Stack, Text } from '@mantine/core'
import MyCard from 'components/MyCard'
import Star from 'components/Star'
import Image from 'next/image'
import React, { memo, useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import { CarDetails } from 'types/car.dto'
import { FetchStatus } from 'types/request.dto'

interface Props {
  car: CarDetails | null
  status: FetchStatus
  period: number | null
}

const RentalCar = memo(({ car, status, period }: Props) => {
  const { classes } = useGlobalStyles()
  const [imgErr, setImgErr] = useState(false)

  const ok = status === 'ok'
  const loading = status === 'loading'

  const price = Number(
    period! > 1 ? car?.price! * period! : car?.price
  ).toFixed(1)
  return (
    <MyCard>
      <Text size='xl' weight='bold'>
        Rental Summary
      </Text>
      <Text color='dimmed' size='sm' mt='xs'>
        Prices may vary depending on the day length of the rental and the price
        of the car.
      </Text>
      <Group spacing='lg' my='lg'>
        {ok ? (
          !imgErr && car?.images[0] ? (
            <Image
              src={car!.images[0]}
              onError={() => setImgErr(true)}
              width={250}
              height={140}
              objectFit='contain'
              alt='car'
            />
          ) : (
            <PhotoIcon height={140} strokeWidth={0.3} opacity={0.2} />
          )
        ) : (
          <Skeleton
            height={120}
            width={250}
            radius='lg'
            mb='lg'
            animate={loading}
          />
        )}
        <Box>
          {ok ? (
            <Text size={32} weight='bold'>
              {car?.name}
            </Text>
          ) : (
            <Skeleton height={30} radius='md' mb='xs' animate={loading} />
          )}
          <Group align='center'>
            <Star rating={ok ? car?.rating.average || 0 : 0} />
            <Text className={classes.secondary_color}>
              {(ok && car?.rating.total) || 0} Review
              {Number(car?.rating.total) > 1 ? 's' : ''}
            </Text>
          </Group>
        </Box>
      </Group>
      <Divider />
      <Stack mt='lg'>
        <Group position='apart' align='center'>
          <Text size='md' color='dimmed' weight={600}>
            Subtotal
          </Text>
          {ok ? (
            <Group noWrap align='center' spacing='xs'>
              <Text size='md' weight={600}>
                ${car?.price}
              </Text>
              {period! > 1 && (
                <>
                  *
                  <Text size='sm' underline weight={500}>
                    {period} days
                  </Text>
                </>
              )}
            </Group>
          ) : (
            <Skeleton radius='md' width={100} height={25} animate={loading} />
          )}
        </Group>
        <Group position='apart' align='center'>
          <Text size='md' color='dimmed' weight={600}>
            Tax
          </Text>
          {ok ? (
            <Text size='md' weight={600}>
              $0
            </Text>
          ) : (
            <Skeleton radius='md' width={70} height={20} animate={loading} />
          )}
        </Group>
        <Group position='apart' align='center' mt='lg'>
          <Box>
            <Text weight='bold' size='xl'>
              Total Rental Price
            </Text>
            <Text size='sm'>Overall price and includes rental discount</Text>
          </Box>
          {ok ? (
            <Text size={32} weight='bold'>
              ${price}
            </Text>
          ) : (
            <Skeleton radius='md' width={120} height={40} animate={loading} />
          )}
        </Group>
      </Stack>
    </MyCard>
  )
})
RentalCar.displayName = 'RentalCar'
export default RentalCar
