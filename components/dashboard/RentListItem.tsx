import { Group, Text } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

type Props = {
  name: string
  car_type: string
  image: string
  date: string
  price: string
}

const RentListItem = ({ name, image, car_type, date, price }: Props) => {
  return (
    <Group noWrap position='apart' align='center' spacing='md'>
      <Image
        src={image}
        width={150}
        height={100}
        objectFit='contain'
        alt='car image'
      />
      <div>
        <Text weight={700} size='md'>
          {name}
        </Text>
        <Text mt='xs' size='xs' color='dimmed' weight={500}>
          {car_type}
        </Text>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          textAlign: 'end',
        }}
      >
        <div>
          <Text size='xs' color='dimmed' weight={500}>
            {date}
          </Text>
          <Text mt='xs' weight={700} size='md'>
            ${price}
          </Text>
        </div>
      </div>
    </Group>
  )
}

export default RentListItem
