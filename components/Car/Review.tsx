import { Avatar, Box, Group, Stack, Text } from '@mantine/core'
import Star from 'components/Star'
import React from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import { CarReview } from 'types/car.dto'

const Review = ({ user, date, review, rating }: CarReview) => {
  const { classes } = useGlobalStyles()

  return (
    <Group noWrap align='start'>
      <Avatar
        sx={{ width: 56, minWidth: 56, height: 56 }}
        radius='xl'
        src={user.avatar}
      />
      <Box>
        <Group position='apart' align='baseline' mt={2} mb='xs'>
          <Box>
            <Text weight={600} size='lg' mb={5}>
              {user.name}
            </Text>
            <Text size='sm' color='dimmed'>
              {user.bio}
            </Text>
          </Box>
          <Box>
            <Text size='sm' color='dimmed' mb={5}>
              {date}
            </Text>
            <Star rating={rating} />
          </Box>
        </Group>
        <Text
          size='md'
          className={classes.secondary_color}
          style={{ lineHeight: 1.9 }}
        >
          {review}
        </Text>
      </Box>
    </Group>
  )
}

export default Review
