import {
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = createStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors[theme.primaryColor][1],
  },
}))

const ErrorPage = () => {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Center className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size='lg' align='center' className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our
          development team was already notified. Try refreshing the page.
        </Text>
        <Group position='center'>
          <Button variant='white' size='md' onClick={() => router.replace('/')}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </Center>
  )
}

export default ErrorPage
