import React from 'react'
import {
  Box,
  Checkbox,
  Group,
  RangeSlider,
  Select,
  Stack,
  Text,
} from '@mantine/core'
import useStyles from 'styles/useGlobalStyles'
import MyNavbar from 'layouts/MyNavbar'
import { SidebarToggleType } from 'types/default.dt'
import { CarFilterTypes } from 'types/car.dto'
import { useRouter } from 'next/router'

const FilterPanel = ({
  opened,
  toggleOpen,
  filters,
}: SidebarToggleType & { filters: CarFilterTypes }) => {
  const router = useRouter()
  const { pathname, query } = router
  const { classes } = useStyles()

  const applyFilter = (val: any, type: string) => {
    let newQuery = { ...query }

    if (type === 'type' || type === 'capacity') {
      let VAL = String(val.val)
      let value = newQuery[type] ? String(newQuery[type]).split(',') : []

      if (newQuery[type] === VAL || (!val.insert && !newQuery[type]))
        delete newQuery[type]
      else if (!val.insert)
        newQuery[type] = value.filter((v: string) => v !== VAL).join(',')
      else newQuery[type] = [...value, VAL].join(',')
    } else if (type === 'price') {
      newQuery.min = val[0]
      newQuery.max = val[1]
    } else {
      newQuery[type] = val
    }

    router.push({
      pathname,
      query: newQuery,
    })
  }

  return (
    <MyNavbar sticky opened={opened} toggleOpen={toggleOpen}>
      <Stack spacing={40}>
        {/* sort */}
        {filters?.sort && (
          <Section title='sort'>
            <Select
              radius='md'
              searchable
              nothingFound='No options'
              placeholder='Sort by...'
              mt='lg'
              onChange={(val) => applyFilter(val, 'sort')}
              defaultValue={
                filters.sort?.find((d) => d.selected || query?.sort === d.label)
                  ?.label
              }
              data={filters.sort?.map((item) => ({
                value: item.label,
                label:
                  String(item.label)[0].toLocaleUpperCase() +
                  String(item.label).substring(1),
              }))}
            />
          </Section>
        )}

        {/* type */}
        {filters?.type && (
          <Section title='type'>
            <Stack spacing='xl' mt='lg'>
              {filters.type?.map((d, ind) => (
                <Checkbox
                  radius={6}
                  size='sm'
                  key={ind}
                  defaultChecked={d.selected || query.type?.includes(d.label)}
                  onChange={(e) =>
                    applyFilter(
                      { val: d.label, insert: e.target.checked },
                      'type'
                    )
                  }
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
          </Section>
        )}

        {/* capacity */}
        {filters?.capacity && (
          <Section title='capacity'>
            <Stack spacing='xl' mt='lg'>
              {filters.capacity?.map((d, ind) => (
                <Checkbox
                  radius={6}
                  size='sm'
                  key={ind}
                  defaultChecked={
                    d.selected || query.capacity?.includes(String(d.label))
                  }
                  onChange={(e) =>
                    applyFilter(
                      { val: d.label, insert: e.target.checked },
                      'capacity'
                    )
                  }
                  label={
                    <Group spacing={5}>
                      <Text className={classes.secondary_color} size='md'>
                        {d.label}
                      </Text>
                      <Text size='md' color='dimmed'>
                        {/* ({d.total}) */}({'>1'})
                      </Text>
                    </Group>
                  }
                />
              ))}
            </Stack>
          </Section>
        )}

        {/* price */}
        {filters?.price && (
          <Section title='price'>
            <RangeSlider
              onChangeEnd={(e) => applyFilter(e, 'price')}
              mt='lg'
              min={filters.price?.min}
              max={filters.price.max}
              defaultValue={[
                Number(query?.min) || filters.price?.min || 10,
                Number(query?.max) || filters.price?.max || 100,
              ]}
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
          </Section>
        )}
      </Stack>
    </MyNavbar>
  )
}
const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <Box>
      <Text color='dimmed' size='xs' transform='uppercase'>
        {title}
      </Text>
      {children}
    </Box>
  )
}
export default FilterPanel
