import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import React, { memo } from 'react'
import Specs from './CarCardSpecs'
import { CarCardTypes } from 'types/car.dto'
import Link from 'next/link'
import NextImage from 'next/image'
import MyCard from 'components/MyCard'
import { PhotoIcon } from '@heroicons/react/24/outline'

const useStyles = createStyles((theme, _params, getRef) => ({
  secondary_color: {
    color: theme.colors.text2[0],
    fill: theme.colors.text2[0],
  },
  link: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark,
  },
  hoverCard: {
    transition: '0.3s box-shadow',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: theme.shadows.lg,
    },
  },
}))

const CarCard = ({
  name,
  car_type,
  in_wishlist,
  image,
  price,
  discount,
  specs,
  slug,
}: CarCardTypes) => {
  const { classes } = useStyles()
  const linkToDetails = '/car/' + slug
  const linkToRental = '/rent/' + slug

  return (
    <MyCard className={classes.hoverCard}>
      <Group position='apart' align='flex-start'>
        <Stack spacing={0}>
          <Link href={linkToDetails} passHref>
            <a className='car-card-link'>
              <Text weight={700} size='lg' className={classes.link}>
                {name}
              </Text>
              <Text weight={600} className={classes.secondary_color} size='sm'>
                {car_type.name}
              </Text>
            </a>
          </Link>
        </Stack>
        <ActionIcon radius='xl' variant='transparent'>
          <Image
            src={
              in_wishlist
                ? '/imgs/heart_filled.svg'
                : '/imgs/heart_outlined.svg'
            }
            alt={'favourite'}
          />
        </ActionIcon>
      </Group>
      <AspectRatio ratio={3 / 2.2}>
        {image ? (
          <Link href={linkToDetails} passHref>
            <a>
              <NextImage
                layout='fill'
                objectFit='contain'
                src={image}
                alt={name}
              />
            </a>
          </Link>
        ) : (
          <PhotoIcon width={20} strokeWidth={0.3} opacity={0.2} />
        )}
      </AspectRatio>
      <Stack spacing='lg'>
        <Specs secondary_color={classes.secondary_color} {...specs} />
        <Group position='apart' align='center'>
          <Box>
            <Group noWrap spacing={5}>
              <Title order={4}>${price} /</Title>
              <Text size='sm' className={classes.secondary_color} weight={600}>
                day
              </Text>
            </Group>
            {discount ? (
              <Text
                size='sm'
                strikethrough
                weight={600}
                className={classes.secondary_color}
              >
                ${discount}
              </Text>
            ) : null}
          </Box>
          <Link href={linkToRental} passHref>
            <Button size='md' component='a'>
              Rent Now
            </Button>
          </Link>
        </Group>
      </Stack>
    </MyCard>
  )
}
export default CarCard
