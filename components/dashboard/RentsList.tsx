import { Divider } from '@mantine/core'
import React from 'react'
import RentListItem from './RentListItem'

const rents = [
  {
    name: 'Aventador S',
    car_type: 'Sport Car',
    image: '/imgs/card1car.png',
    date: '20 July',
    price: '100.00',
  },
  {
    name: 'BMW',
    car_type: 'Sport Car',
    image: '/imgs/card2car.png',
    date: '10 June',
    price: '80.00',
  },
]

type Props = {}

const RentsList = (props: Props) => {
  return (
    <div>
      {[...rents, ...rents, ...rents].map((rent, i) => (
        <div key={i}>
          {i !== 0 && <Divider />}
          <RentListItem {...rent} />
        </div>
      ))}
    </div>
  )
}

export default RentsList
