import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { Box, createStyles, Grid, Group } from '@mantine/core'
import MyComp from 'containers/MyComp'
import cars from 'data/cars'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import useGlobalStyles from 'styles/useGlobalStyles'
import MyNavbar from 'layouts/MyNavbar'

const CarCard = dynamic(() => import('components/Car/CarCard'), {
  suspense: true,
})

const useStyle = createStyles((theme) => ({
  bgRightCover: {
    position: 'relative',
    '::before': {
      position: 'absolute',
      width: '50%',
      left: 0,
      top: 0,
      height: '100%',
      background:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      content: '""',
      zIndex: -1,
    },
  },
}))
const Filter: NextPage = () => {
  const { classes } = useGlobalStyles()
  const { classes: cls } = useStyle()
  return (
    <>
      <MyHeader sticky />
      <Box className={cls.bgRightCover}>
        <MyComp p={0}>
          <Group spacing={0} align='stretch' noWrap>
            <MyNavbar sticky />
            <Box p='xl' className={classes.bgBody}>
              <Grid>
                <Suspense>
                  {[...cars].map((car) => (
                    <Grid.Col
                      span={12}
                      xs={6}
                      sm={4}
                      md={6}
                      lg={4}
                      xl={3}
                      key={car.id}
                    >
                      <CarCard key={car.id} {...car} />
                    </Grid.Col>
                  ))}
                </Suspense>
              </Grid>
            </Box>
          </Group>
        </MyComp>
      </Box>
      <MyFooter />
    </>
  )
}
export default Filter
