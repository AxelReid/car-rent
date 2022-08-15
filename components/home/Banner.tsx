import {
  AspectRatio,
  Box,
  Button,
  Card,
  createStyles,
  Text,
  Image,
} from '@mantine/core'
import Link from 'next/link'

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    maxWidth: 320,
  },
  title: {
    // fontFamily: 'Plus Jakarta Sans',
    fontSize: 35,
    color: 'white',
    lineHeight: '38px',
    letterSpacing: '-0.01em',
    textAlign: 'left',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 25,
    },
  },
  desc: {
    color: 'white',
    lineHeight: '26px',
    letterSpacing: '0.02em',
    textAlign: 'left',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 16,
    },
  },
  car: {
    position: 'absolute',
    bottom: 15,
    '@media (max-width: 600px)': {
      padding: '0 10%',
    },
  },
}))

interface Props {
  link: string
  bg: React.ReactNode
  car: string
  title: string
  desc: string
  btnColor?: string
  px: number | string
}

const Banner = ({
  link,
  bg,
  car,
  title,
  desc,
  btnColor = 'indigo',
  px,
}: Props) => {
  const { classes } = useStyles()

  return (
    <AspectRatio ratio={16 / 9} sx={{ minHeight: 300 }}>
      <Card radius='lg'>
        {bg}
        <Card.Section p='xs' className={classes.card}>
          <Box className={classes.content}>
            <Text weight='bolder' className={classes.title}>
              {title}
            </Text>
            <Text mt='lg' size='lg' className={classes.desc}>
              {desc}
            </Text>
            <Link href={link} passHref>
              <Button mt='lg' size='lg' color={btnColor} component='a'>
                Rental Car
              </Button>
            </Link>
          </Box>
        </Card.Section>
        <Image
          src={car}
          alt='car-image'
          px={px}
          fit='contain'
          className={classes.car}
        />
      </Card>
    </AspectRatio>
  )
}
export default Banner
