import { Box, Card, Grid, Group, RingProgress, Text } from '@mantine/core'
import Chart from 'components/dashboard/Chart'
import DashboardPanel from 'components/dashboard/DashboardPanel'
import Details from 'components/dashboard/Details'
import RentsList from 'components/dashboard/RentsList'
import MyCard from 'components/MyCard'
import MyComp from 'containers/MyComp'
import MyFooter from 'layouts/MyFooter'
import MyHeader from 'layouts/MyHeader'
import React, { useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'

const Dashboard = () => {
  const { classes } = useGlobalStyles()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <MyHeader sticky opened={opened} toggleOpen={setOpened} />
      <Box className={classes.bgCover}>
        <MyComp p={0}>
          <Group spacing={0} align='stretch' noWrap>
            <DashboardPanel opened={opened} toggleOpen={setOpened} />
            <Box p='xl' className={classes.bgBody} style={{ width: '100%' }}>
              <Grid gutter={30} pt='xs'>
                <Grid.Col span={12} lg={6}>
                  <MyCard>
                    <Text size='xl' weight='bold' mb='md'>
                      Rental Details
                    </Text>
                    <Details />
                  </MyCard>
                </Grid.Col>
                <Grid.Col span={12} lg={6}>
                  <div>
                    <MyCard>
                      <Text size='xl' weight='bold' mb='md'>
                        Top 5 Car Rentals
                      </Text>
                      <Chart />
                    </MyCard>
                    <MyCard mt={30}>
                      <Text size='xl' weight='bold' mb='md'>
                        Recent Transactions
                      </Text>
                      <RentsList />
                    </MyCard>
                  </div>
                </Grid.Col>
              </Grid>
            </Box>
          </Group>
        </MyComp>
      </Box>
      <MyFooter />
    </>
  )
}

export default Dashboard
