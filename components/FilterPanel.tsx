import React from 'react'
import {
  Box,
  Checkbox,
  Group,
  RangeSlider,
  Select,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import useStyles from 'styles/useGlobalStyles'
import MyNavbar from 'layouts/MyNavbar'
import { SidebarToggleType } from 'types/default.dt'
import { CarFilterTypes } from 'types/car.dto'
import { useRouter } from 'next/router'

interface Props {
  filters: CarFilterTypes
  dataExist: boolean
  applyFilter: (val: any, type: string) => void
}

const FilterPanel = ({
  opened,
  toggleOpen,
  filters,
  dataExist,
  applyFilter,
}: SidebarToggleType & Props) => {
  const router = useRouter()
  const { query } = router
  const { classes } = useStyles()

  return (
    <MyNavbar sticky opened={opened} toggleOpen={toggleOpen}>
      <Stack spacing={40}>
        {/* sort */}
        <Section title='sort' dataExist={dataExist}>
          <Select
            radius='md'
            searchable
            nothingFound='No options'
            placeholder='Sort by...'
            mt='lg'
            onChange={(val) => applyFilter(val, 'sort')}
            defaultValue={
              filters?.sort?.find((d) => d.selected || query?.sort === d.label)
                ?.label
            }
            data={filters?.sort!?.map((item) => ({
              value: item.label,
              label:
                String(item.label)[0].toLocaleUpperCase() +
                String(item.label).substring(1),
            }))}
          />
        </Section>

        {/* type */}
        <Section title='type' dataExist={dataExist}>
          <Stack spacing='xl' mt='lg'>
            {filters?.type?.map((d, ind) => (
              <Checkbox
                radius={6}
                size='sm'
                key={ind}
                checked={!!query.type?.includes(d.label)}
                onChange={(e) =>
                  applyFilter(
                    {
                      val: d.label.toLocaleLowerCase(),
                      insert: e.target.checked,
                    },
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

        {/* capacity */}
        <Section title='capacity' dataExist={dataExist}>
          <Stack spacing='xl' mt='lg'>
            {filters?.capacity?.map((d, ind) => (
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
                  <Text className={classes.secondary_color} size='md'>
                    {d.label}
                  </Text>
                }
              />
            ))}
          </Stack>
        </Section>

        {/* price */}
        <Section title='price' dataExist={dataExist}>
          <RangeSlider
            onChangeEnd={(e) => applyFilter(e, 'price')}
            mt='lg'
            min={filters?.price?.min}
            max={filters?.price?.max}
            defaultValue={[
              Number(query?.min) || filters?.price?.min || 0,
              Number(query?.max) || filters?.price?.max || 100,
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
      </Stack>
    </MyNavbar>
  )
}
const Section = ({
  title,
  children,
  dataExist,
}: {
  title: string
  children: React.ReactNode
  dataExist: boolean
}) => {
  const router = useRouter()
  const { pathname, query } = router
  const hasFilter = title === 'price' ? query.min || query.max : query[title]

  const clearAFilter = () => {
    if (title === 'price') {
      delete query.min
      delete query.max
    } else {
      delete query[title]
    }
    router.push({
      pathname,
      query,
    })
  }

  return (
    <Box>
      <Group position='apart' align='center'>
        <Text color='dimmed' size='xs' transform='uppercase'>
          {title}
        </Text>
        {hasFilter && (
          <UnstyledButton onClick={clearAFilter}>
            <Text color='dimmed' size='xs' underline>
              clear
            </Text>
          </UnstyledButton>
        )}
      </Group>
      {dataExist ? (
        children
      ) : (
        <Skeleton
          height={30}
          mt={5}
          radius='sm'
          animate={false}
          style={{ opacity: 0.4 }}
        />
      )}
    </Box>
  )
}
export default FilterPanel
