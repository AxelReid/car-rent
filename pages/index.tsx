import type { NextPage } from 'next'
import { Grid, Stack } from '@mantine/core'
import { bg1, bg2 } from 'components/home/cardBg'
import MyHeader from 'layouts/MyHeader'
import Banner from 'components/home/Banner'
import MyComp from 'containers/MyComp'
import MyFooter from 'layouts/MyFooter'
import dynamic from 'next/dynamic'
import requests from 'requests'
import { useCallback, useEffect, useState } from 'react'
import { CarCardTypes } from 'types/car.dto'

const CarsSlider = dynamic(() => import('containers/CarsSlider'))
const Recommended = dynamic(() => import('containers/Recommended'))

const Home: NextPage = () => {
  const [popularCars, setPopularCars] = useState<CarCardTypes[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPopular = useCallback(async () => {
    const res = await requests.cars.popular()
    setPopularCars(res.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPopular()
  }, [fetchPopular])

  return (
    <>
      <MyHeader />
      <MyComp py='xl'>
        <Stack mt='sm' spacing={35}>
          <Grid gutter={20}>
            <Grid.Col span={12} md={6}>
              <Banner
                bg={bg1}
                link='/filter?sort=desc'
                car='imgs/card1car.png'
                title='The Best Platform for Car Rental'
                desc='Ease of doing a car rental safely and reliably. Of course at a low price.'
                px={'17%'}
              />
            </Grid.Col>
            <Grid.Col span={12} md={6}>
              <Banner
                link='/filter?sort=esc'
                bg={bg2}
                car='imgs/card2car.png'
                title='Easy way to rent a car at a low price'
                desc='Providing cheap car rental services and safe and comfortable facilities.'
                px={'22%'}
                btnColor='cyan'
              />
            </Grid.Col>
          </Grid>
          <CarsSlider
            loading={loading}
            data={popularCars}
            title='Popular Cars'
            link='/filter?sort=popular'
          />
          <Recommended />
        </Stack>
      </MyComp>
      <MyFooter />
    </>
  )
}

export default Home
