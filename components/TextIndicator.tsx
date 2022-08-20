import { Box, createStyles, Indicator, Text } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({
  indicator: {
    borderWidth: 4,
    borderColor:
      theme.colorScheme === 'dark'
        ? 'rgba(37,38,43,0.7)'
        : 'rgba(255,255,255,0.8)',
  },
}))

interface Props {
  color: string
  title: string
}

const TextIndicator = ({ color, title }: Props) => {
  const { classes } = useStyles()

  return (
    <Box pl={7}>
      <Indicator
        position='middle-start'
        color={color}
        withBorder
        inline
        size={17}
        classNames={{ indicator: classes.indicator }}
      >
        <Text ml='md' size='md' weight={500}>
          {title}
        </Text>
      </Indicator>
    </Box>
  )
}

export default TextIndicator
