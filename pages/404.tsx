import { Button, Center, createStyles, Group, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = createStyles((theme) => ({
  root: {
    height: '100vh',
  },

  inner: {
    position: 'relative',
  },

  fourOfour: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    opacity: theme.colorScheme === 'dark' ? 0.3 : 0.1,
    '.text': {
      fontSize: 'min(48vw,500px)',
      fontWeight: 900,
      marginBottom: 'min(9%,200px)',
    },
  },

  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  title: {
    fontFamily: theme.fontFamily,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

const NotFoundPage = () => {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Center className={classes.root}>
      <div className={classes.inner}>
        <Center className={classes.fourOfour}>
          <Text className='text' color='dimmed' align='center'>
            404
          </Text>
        </Center>
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            color='dimmed'
            size='lg'
            align='center'
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position='center'>
            <Button size='md' onClick={() => router.back()}>
              Take me one step back
            </Button>
          </Group>
        </div>
      </div>
    </Center>
  )
}

export default NotFoundPage
