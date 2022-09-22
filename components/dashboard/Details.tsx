import {
  AspectRatio,
  Card,
  createStyles,
  Divider,
  Grid,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import TextIndicator from 'components/TextIndicator'
import Image from 'next/image'
import React from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'

type Props = {}
interface InfoType {
  title: 'Pick-Up' | 'Drop-Off'
}

const useStyles = createStyles((theme) => ({
  colBL: {
    position: 'relative',
    paddingLeft: '5%',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1px',
      height: '70%',
      background: 'red',
    },
  },
}))

const Details = (props: Props) => {
  const { classes } = useGlobalStyles()

  const Info = ({ title }: InfoType) => (
    <div>
      <TextIndicator
        color={title === 'Pick-Up' ? 'blue' : 'cyan'}
        title={title}
      />
      <Group mt='xs' align='stretch' spacing='xl' noWrap>
        <div style={{ flex: 1 }}>
          <Text size='md' weight={600}>
            Address
          </Text>
          <Text mt={3} size='sm' color='dimmed'>
            Andijan
          </Text>
        </div>
        <Divider orientation='vertical' />
        <div style={{ flex: 1 }}>
          <Text size='md' weight={600}>
            Date
          </Text>
          <Text mt={3} size='sm' color='dimmed'>
            20 July 2022
          </Text>
        </div>
        <Divider orientation='vertical' />
        <div style={{ flex: 1 }}>
          <Text size='md' weight={600}>
            Time
          </Text>
          <Text mt={3} size='sm' color='dimmed'>
            17:00
          </Text>
        </div>
      </Group>
    </div>
  )

  return (
    <Stack>
      <AspectRatio ratio={16 / 9}>
        <Card
          radius='lg'
          sx={(theme) => ({
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
          })}
        >
          map
        </Card>
      </AspectRatio>
      <Group noWrap position='apart' align='center' spacing='md'>
        <Group>
          <Image
            src='/imgs/card1car.png'
            width={160}
            height={110}
            objectFit='contain'
            alt='car image'
          />
          <div>
            <Text size={24} weight={700}>
              Aventador S
            </Text>
            <Text
              mt={5}
              size='sm'
              weight={500}
              className={classes.secondary_color}
            >
              Sport Car
            </Text>
          </div>
        </Group>
        <div>
          <Text mb={5}>#3455</Text>
          <div />
        </div>
      </Group>

      <Info title='Pick-Up' />
      <Space />
      <Info title='Drop-Off' />
      <Space />
      <Divider />

      <Group position='apart' align='center' mt='lg'>
        <div>
          <Text weight='bold' size='xl'>
            Total Rental Price
          </Text>
          <Text size='sm' className={classes.secondary_color}>
            Overall price and includes rental discount
          </Text>
        </div>
        <Text size={32} weight='bold'>
          $80.00
        </Text>
      </Group>
    </Stack>
  )
}

export default Details
