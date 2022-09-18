import { Carousel } from '@mantine/carousel'
import { Box, createStyles, Group, Text, useMantineTheme } from '@mantine/core'
import React, { memo, useRef } from 'react'
import cars from 'data/cars'
import { useMediaQuery } from '@mantine/hooks'
import Autoplay from 'embla-carousel-autoplay'
import CarCard from 'components/Car/CarCard'
import Link from 'next/link'
import { CarCardTypes } from 'types/car.dto'

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}))

type Props = { title?: string; link?: string; data: CarCardTypes[] }

const CarsSlider = memo(({ title, link, data = [] }: Props) => {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  const { classes } = useStyles()
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  if (data.length < 1) return null

  return (
    <Box>
      <Group position='apart' align='center'>
        {title && (
          <Text
            m='md'
            mb='xl'
            size='md'
            weight={600}
            sx={(theme) => ({ color: theme.colors.text2[0] })}
          >
            {title}
          </Text>
        )}
        {link && (
          <Link href={link} passHref>
            <Text variant='link' component='a' weight={600} size='md'>
              View All
            </Text>
          </Link>
        )}
      </Group>
      <Carousel
        slideSize={304}
        slideGap='xl'
        loop
        slidesToScroll={mobile ? 1 : 2}
        controlsOffset='xs'
        controlSize={35}
        align='start'
        classNames={classes}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        breakpoints={[
          { maxWidth: 1100, slideSize: 304, slideGap: 'md' },
          { maxWidth: 800, slideSize: 290, slideGap: 'sm' },
          { maxWidth: 600, slideSize: 290, slideGap: 'sm' },
        ]}
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
      >
        {data.map((car) => (
          <Carousel.Slide key={car.id} size={304}>
            <CarCard {...car} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  )
})
CarsSlider.displayName = 'CarsSlider'

export default CarsSlider
