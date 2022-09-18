import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Badge, Group, Stack, Title } from '@mantine/core'
import CarDetail from 'components/Car/CarDetail'
import Review from 'components/Car/Review'
import MyComp from 'containers/MyComp'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import { CarDetails } from 'types/car.dto'
import requests from 'requests'
import MyCard from 'components/MyCard'
import useRecentCars from 'hooks/useRecentCars'

const CarsSlider = dynamic(() => import('containers/CarsSlider'))

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await requests.cars.slugs()).map((slug) => ({ params: slug }))
  return {
    paths,
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const carSlug = params?.slug
  try {
    const carDetail = await requests.cars.details(carSlug || '')
    const status = carDetail.status

    if (status === 200) {
      return {
        props: {
          status,
          car: carDetail.data,
        },
      }
    }
    return {
      props: {
        status,
        car: null,
      },
    }
  } catch (error) {
    return {
      props: {
        car: null,
        status: 500,
      },
    }
  }
}

type Props = { car: CarDetails; status: number }

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

const Car = ({ car, status }: Props) => {
  const { recentCars, saveToRecent } = useRecentCars()

  useEffect(() => {
    if (status === 200) {
      saveToRecent(car.id, car)
    }
  }, [car])

  return (
    <>
      <MyHeader />
      <MyComp pt={30} mb='xl'>
        <Stack spacing='xl'>
          {status === 200 ? (
            <>
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
            </>
          ) : status === 404 ? (
            'Not found'
          ) : (
            'Something wrong this status code ' + status
          )}
          <CarsSlider data={recentCars} title='Recent Cars' />
          <CarsSlider data={[]} title='Recomendation Cars' link='/filter' />
        </Stack>
      </MyComp>
      <MyFooter />
    </>
  )
}

export default Car
