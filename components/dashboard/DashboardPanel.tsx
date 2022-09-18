import { ActionIcon, Box, NavLink, Stack, Text } from '@mantine/core'
import MyNavbar from 'layouts/MyNavbar'
import React, { memo } from 'react'
import { dashboardLinks } from 'data/dashboardLinks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useGlobalStyles from 'styles/useGlobalStyles'
import { ArrowLeftOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/outline'
import { Permission_types, SidebarToggleType } from 'types/default.dt'
import requests from 'requests'
import guard from 'utils/guard'

interface MenuType {
  label: string
  icon: JSX.Element
  path?: string
  permissions?: Permission_types[] | string[]
  children?: MenuType[]
}

const DashboardPanel = memo(({ opened, toggleOpen }: SidebarToggleType) => {
  const router = useRouter()
  const { classes } = useGlobalStyles()

  const logout = async () => {
    await requests.auth.logout()
  }

  const Items = ({ items }: { items: MenuType[] }) => {
    return (
      <Stack spacing={3} my={3}>
        {items
          .filter((item) => guard(item?.permissions))
          .map((item, i) => (
            <Item key={i} item={item} />
          ))}
      </Stack>
    )
  }

  const Item = ({ item }: { item: MenuType }) => {
    const menuItem = (
      <NavLink
        defaultOpened={
          item?.children
            ? item.children.findIndex(
                ({ path }) => path === router.pathname
              ) !== -1
              ? true
              : false
            : false
        }
        variant='filled'
        component='a'
        active={item?.path === router.pathname}
        py='sm'
        sx={(theme) => ({
          borderRadius: theme.radius.md,
        })}
        label={
          <Text
            transform='capitalize'
            size='lg'
            className={classes.secondary_color}
            sx={(theme) => {
              const active = router.pathname === item?.path
              return {
                color: active ? theme.white : '',
                fontWeight: active ? 600 : 500,
              }
            }}
          >
            {item.label}
          </Text>
        }
        icon={
          <ActionIcon
            variant='transparent'
            className={classes.secondary_color}
            sx={(theme) => ({
              color: item?.path === router.pathname ? theme.white : '',
            })}
          >
            {item?.icon}
          </ActionIcon>
        }
      >
        {item?.children && <Items items={item.children} />}
      </NavLink>
    )

    if (item?.path)
      return (
        <Link href={item.path} passHref>
          {menuItem}
        </Link>
      )
    return menuItem
  }

  return (
    <MyNavbar
      sticky
      opened={opened}
      toggleOpen={toggleOpen}
      bottomSection={
        <NavLink
          py='sm'
          px='md'
          sx={(theme) => ({
            borderRadius: theme.radius.md,
          })}
          icon={<LogoutIcon className={classes.secondary_color} width={24} />}
          onClick={logout}
          label={
            <Text
              transform='capitalize'
              size='lg'
              weight={500}
              className={classes.secondary_color}
            >
              Log Out
            </Text>
          }
        />
      }
    >
      <Stack spacing={40}>
        {dashboardLinks.map((item) => (
          <Box key={item.label}>
            <Text color='dimmed' size='xs' transform='uppercase'>
              {item.label}
            </Text>
            <Stack spacing={3} mt='md'>
              <Items items={item.links} />
            </Stack>
          </Box>
        ))}
      </Stack>
    </MyNavbar>
  )
})
DashboardPanel.displayName = 'DashboardPanel'
export default DashboardPanel
