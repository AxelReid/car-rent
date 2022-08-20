import React from 'react'
import dynamic from 'next/dynamic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Badge, Card, Group, Stack, Title } from '@mantine/core'
import CarDetail from 'components/Car/CarDetail'
import Review from 'components/Car/Review'
import MyComp from 'containers/MyComp'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import { CarDetails } from 'types/car.dto'
import requests from 'requests'
import MyCard from 'components/MyCard'

const CarsSlider = dynamic(() => import('containers/CarsSlider'))

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: '1' } }],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const carSlug = params?.slug
  try {
    const carDetail = await requests.cars.details('bmv')
    return {
      props: {
        car: carDetail.data?.data,
      },
    }
  } catch (error) {
    return {
      props: {
        car: {
          slug: '1',
          name: 'Rs7 2021',
          car_type: { key: 'audi', name: 'Audi' },
          images: [
            '/imgs/card1car.png',
            '/imgs/card2car.png',
            '/imgs/card1bg.svg',
          ],
          price: '$80.00',
          discount: '$95.00',
          in_wishlist: true,
          specs: { steering: 'Manual', capacity: '4 People', gasoline: '80L' },
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit iusto perferendis ullam ad harum officiis error asperiores repellat omnis velit officia vitae cum, est dolorem rerum, animi iste eveniet! Officiis',
          rating: {
            average: 4,
            total: 97,
          },
        },
      },
    }
  }
}

type Props = { car: CarDetails }

const reviews = [
  {
    user: {
      avatar:
        'https://i.scdn.co/image/ab6761610000e5eb0ff4f1b8113d77f33b4db58f',
      bio: 'Qari, Sheikh',
      name: 'Raad Muhammad Al Kurdi',
    },
    date: '12 July 2022',
    rating: 3,
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore asperiores quis eaque accusantium nostrum facere minus dolor sunt quo consequuntur officia corporis aspernatur necessitatibus ullam doloremque labore est voluptate, iste quibusdam iure beatae voluptatum non? Dolor explicabo nemo excepturi eos autem facere ab animi dolores.',
  },
  {
    user: {
      avatar:
        'https://i.scdn.co/image/ab6761610000e5eb0ff4f1b8113d77f33b4db58f',
      bio: 'Qari, Sheikh',
      name: 'Raad Muhammad Al Kurdi',
    },
    date: '12 July 2022',
    rating: 5,
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore asperiores quis eaque accusantium nostrum facere minus dolor sunt quo consequuntur officia corporis aspernatur necessitatibus ullam doloremque labore est voluptate, iste quibusdam iure beatae voluptatum non? Dolor explicabo nemo excepturi eos autem facere ab animi dolores.',
  },
  {
    user: {
      avatar:
        'https://i.scdn.co/image/ab6761610000e5eb0ff4f1b8113d77f33b4db58f',
      bio: 'Qari, Sheikh',
      name: 'Raad Muhammad Al Kurdi',
    },
    date: '12 July 2022',
    rating: 2,
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore asperiores quis eaque accusantium nostrum facere minus dolor sunt quo consequuntur officia corporis aspernatur necessitatibus ullam doloremque labore est voluptate, iste quibusdam iure beatae voluptatum non? Dolor explicabo nemo excepturi eos autem facere ab animi dolores.',
  },
]

const Car = ({ car }: Props) => {
  return (
    <>
      <MyHeader />
      <MyComp pt={30} mb='xl'>
        <Stack spacing='xl'>
          <CarDetail {...car} />
          <MyCard>
            <Group>
              <Title order={3}>Reviews</Title>
              <Badge size='xl' radius='md' variant='filled'>
                13
              </Badge>
            </Group>
            <Stack mt='xl' spacing={25}>
              {reviews.map((review, i) => (
                <Review key={i} {...review} />
              ))}
            </Stack>
          </MyCard>
          <CarsSlider title='Recent Cars' />
          <CarsSlider title='Recomendation Cars' link='/filter' />
        </Stack>
      </MyComp>
      <MyFooter />
    </>
  )
}

export default Car
