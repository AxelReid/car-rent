import { ActionIcon, Box, NavLink, Stack, Text } from '@mantine/core'
import MyNavbar from 'layouts/MyNavbar'
import React, { memo } from 'react'
import { dashboardLinks } from 'data/dashboardLinks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useGlobalStyles from 'styles/useGlobalStyles'
import { LogoutIcon } from '@heroicons/react/outline'
import { SidebarToggleType } from 'types/default.dt'

const DashboardPanel = memo(({ opened, toggleOpen }: SidebarToggleType) => {
  const router = useRouter()
  const { classes } = useGlobalStyles()

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
              {item.links.map((link, i) => (
                <Link href={link.path} key={i} passHref>
                  <NavLink
                    variant='filled'
                    component='a'
                    active={link.path === router.pathname}
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
                          const active = router.pathname === link.path
                          return {
                            color: active ? theme.white : '',
                            fontWeight: active ? 600 : 500,
                          }
                        }}
                      >
                        {link.label}
                      </Text>
                    }
                    icon={
                      <ActionIcon
                        className={classes.secondary_color}
                        sx={(theme) => ({
                          color:
                            link.path === router.pathname ? theme.white : '',
                        })}
                      >
                        {link.icon}
                      </ActionIcon>
                    }
                  />
                </Link>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </MyNavbar>
  )
})
DashboardPanel.displayName = 'DashboardPanel'
export default DashboardPanel
