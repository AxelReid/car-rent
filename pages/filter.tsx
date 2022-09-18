import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { Box, Button, Grid, Group, Text } from '@mantine/core'
import MyComp from 'containers/MyComp'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import useGlobalStyles from 'styles/useGlobalStyles'
import FilterPanel from 'components/FilterPanel'
import requests from 'requests'
import { FilterResData } from 'types/request.dto'
import { useRouter } from 'next/router'
import { useCounter } from '@mantine/hooks'

const CarCard = dynamic(() => import('components/Car/CarCard'))

interface Props {
  data: FilterResData
  error: boolean
}

const Filter = ({ data, error }: Props) => {
  const router = useRouter()
  const { pathname, query } = router
  const { classes } = useGlobalStyles()
  const [opened, setOpened] = useState(false)
  const [count, handleCount] = useCounter(1)
  const [loading, setLoading] = useState(false)
  const [cars, setCars] = useState(data.data || [])
  const [currentTotal, setCurrentTotal] = useState({
    current: data.current,
    total: data.total,
  })

  const initialize = useCallback(() => {
    setCurrentTotal({ current: data.current, total: data.total })
    setCars(data.data)
  }, [query])

  useEffect(() => initialize(), [query])

  const applyFilter = useCallback(
    (val: any, type: string) => {
      let newQuery = { ...query }

      if (type === 'type' || type === 'capacity' || type === 'page') {
        let VAL = String(val.val)
        let value = newQuery[type] ? String(newQuery[type]).split(',') : ['1']

        if (newQuery[type] === VAL || (!val.insert && !newQuery[type]))
          delete newQuery[type]
        else if (!val.insert)
          newQuery[type] = value.filter((v: string) => v !== VAL).join(',')
        else newQuery[type] = [...value, VAL].join(',')
      } else if (type === 'price') {
        newQuery.min = val[0]
        newQuery.max = val[1]
      } else {
        newQuery[type] = val
      }

      router.push({
        pathname,
        query: newQuery,
      })
    },
    [query]
  )

  const fetchMore = async () => {
    setLoading(true)
    // TODO:
    // get the next individual page and push it to the previous ones
    let pages = '1'
    for (let i = 2; i <= count + 1; i++) pages += ',' + i
    handleCount.increment()
    const res = await requests.cars.filter({ ...query, page: pages })
    setCurrentTotal({ current: res.current, total: res.total })
    setCars(res.data)
    setLoading(false)
  }

  return (
    <>
      <MyHeader sticky opened={opened} toggleOpen={setOpened} />
      <Box className={classes.bgCover}>
        <MyComp p={0}>
          <Group spacing={0} align='stretch' noWrap>
            <FilterPanel
              applyFilter={applyFilter}
              dataExist={!error || !!data.total}
              filters={data?.filter}
              opened={opened}
              toggleOpen={setOpened}
            />
            <Box p='xl' className={classes.bgBody} style={{ flex: 1 }}>
              {error ? (
                'something went wrong'
              ) : cars.length ? (
                <Grid>
                  <Suspense>
                    {cars.map((car) => (
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
              ) : (
                'no data'
              )}
              {currentTotal.current ? (
                <Group pt={50} position='apart'>
                  <div />
                  {currentTotal.current < currentTotal.total && (
                    <Button
                      size='md'
                      onClick={() => fetchMore()}
                      loading={loading}
                    >
                      Show more cars
                    </Button>
                  )}
                  <Text color='dimmed'>
                    {currentTotal.current >= currentTotal.total
                      ? ''
                      : currentTotal.current + ' /'}{' '}
                    {currentTotal.total} car
                    {currentTotal.current > 1 ? 's' : ''}
                  </Text>
                </Group>
              ) : null}
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
    const data = await requests.cars.filter({ ...query })
    return {
      props: { data, error: false },
    }
  } catch (error) {
    return {
      props: { data: {}, error: true },
    }
  }
}

export default Filter
