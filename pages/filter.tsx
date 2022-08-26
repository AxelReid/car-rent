import React, { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { Box, Grid, Group } from '@mantine/core'
import MyComp from 'containers/MyComp'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import useGlobalStyles from 'styles/useGlobalStyles'
import FilterPanel from 'components/FilterPanel'
import requests from 'requests'
import { FilterResData } from 'types/request.dto'

const CarCard = dynamic(() => import('components/Car/CarCard'))

interface Props {
  data: FilterResData
}

const Filter = ({ data }: Props) => {
  const { classes } = useGlobalStyles()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <MyHeader sticky opened={opened} toggleOpen={setOpened} />
      <Box className={classes.bgCover}>
        <MyComp p={0}>
          <Group spacing={0} align='stretch' noWrap>
            <FilterPanel
              filters={data?.filter}
              opened={opened}
              toggleOpen={setOpened}
            />
            <Box p='xl' className={classes.bgBody} style={{ flex: 1 }}>
              <Grid>
                <Suspense>
                  {data?.data.map((car) => (
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const data = await requests.cars.filter(query)
    return {
      props: { data },
    }
  } catch (error) {
    return {
      props: { data: {} },
    }
  }
}

export default Filter
