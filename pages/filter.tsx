import React, { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { Box, Grid, Group } from '@mantine/core'
import MyComp from 'containers/MyComp'
import cars from 'data/cars'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import useGlobalStyles from 'styles/useGlobalStyles'
import FilterPanel from 'components/FilterPanel'

const CarCard = dynamic(() => import('components/Car/CarCard'), {
  suspense: true,
})

const Filter: NextPage = () => {
  const { classes } = useGlobalStyles()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <MyHeader sticky opened={opened} toggleOpen={setOpened} />
      <Box className={classes.bgCover}>
        <MyComp p={0}>
          <Group spacing={0} align='stretch' noWrap>
            <FilterPanel opened={opened} toggleOpen={setOpened} />
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
