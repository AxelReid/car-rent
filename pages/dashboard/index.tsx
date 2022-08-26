import { Grid, Text } from '@mantine/core'
import Chart from 'components/dashboard/Chart'
import DashboardWrapper from 'components/dashboard/DashboardWrapper'
import Details from 'components/dashboard/Details'
import RentsList from 'components/dashboard/RentsList'
import MyCard from 'components/MyCard'
import React from 'react'

const Dashboard = () => {
  return (
    <>
      <DashboardWrapper>
        <Grid gutter={25} pt='xs'>
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
              <MyCard mt={25}>
                <Text size='xl' weight='bold' mb='md'>
                  Recent Transactions
                </Text>
                <RentsList />
              </MyCard>
            </div>
          </Grid.Col>
        </Grid>
      </DashboardWrapper>
    </>
  )
}

export default Dashboard
