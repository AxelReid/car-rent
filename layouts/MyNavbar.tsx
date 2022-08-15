import {
  Box,
  Checkbox,
  Group,
  Navbar,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Text,
} from '@mantine/core'
import React, { memo } from 'react'
import useStyles from 'styles/useGlobalStyles'

type Props = { sticky?: boolean }
const filter = [
  {
    title: 'type',
    data: [
      { checked: true, label: 'Sport', total: 10 },
      { checked: true, label: 'SUV', total: 12 },
      { checked: false, label: 'MPV', total: 16 },
      { checked: false, label: 'Sedan', total: 20 },
      { checked: false, label: 'Coupe', total: 14 },
      { checked: false, label: 'Hatchback', total: 14 },
    ],
  },
  {
    title: 'capacity',
    data: [
      { checked: true, label: '2 People', total: 10 },
      { checked: false, label: '4 People', total: 14 },
      { checked: false, label: '6 People', total: 12 },
      { checked: true, label: '8 People', total: 16 },
    ],
  },
  { title: 'price', max: 100 },
]
const sort = [
  {
    label: 'popular',
    selected: true,
  },
  {
    label: 'new',
    selected: false,
  },
  {
    label: 'desc',
    selected: false,
  },
  {
    label: 'esc',
    selected: false,
  },
]

const MyNavbar = memo(({ sticky }: Props) => {
  const { classes } = useStyles()

  return (
    <Navbar
      sx={{ position: sticky ? 'sticky' : 'relative', top: 110, zIndex: 0 }}
      hiddenBreakpoint='md'
      hidden
      width={{ md: 300 }}
    >
      <ScrollArea style={{ height: '100%' }} p='lg'>
        <Stack spacing={40}>
          <Box>
            <Text color='dimmed' size='xs' transform='uppercase'>
              sort
            </Text>
            <Select
              radius='md'
              searchable
              nothingFound='No options'
              placeholder='Sort by...'
              mt='lg'
              data={sort.map((item) => ({
                value: item.label,
                label:
                  String(item.label)[0].toLocaleUpperCase() +
                  String(item.label).substring(1),
              }))}
            />
          </Box>
          {filter.map((dt, i) => (
            <Box key={i}>
              <Text color='dimmed' size='xs' transform='uppercase'>
                {dt.title}
              </Text>
              {dt.title !== 'price' ? (
                <Stack spacing='xl' mt='lg'>
                  {dt.data?.map((d, ind) => (
                    <Checkbox
                      radius={6}
                      size='sm'
                      key={ind}
                      defaultChecked={d.checked}
                      label={
                        <Group spacing={5}>
                          <Text className={classes.secondary_color} size='md'>
                            {d.label}
                          </Text>
                          <Text size='md' color='dimmed'>
                            ({d.total})
                          </Text>
                        </Group>
                      }
                    />
                  ))}
                </Stack>
              ) : (
                <Slider
                  mt='lg'
                  styles={(theme) => ({
                    track: { height: 12 },
                    thumb: {
                      background: theme.colors.blue,
                      width: 24,
                      height: 24,
                      borderColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[7]
                          : theme.white,
                      boxShadow: 'none',
                    },
                  })}
                />
              )}
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Navbar>
  )
})
MyNavbar.displayName = 'MyNavbar'
export default MyNavbar
