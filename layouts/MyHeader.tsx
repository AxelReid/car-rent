import {
  Avatar,
  Burger,
  Grid,
  Group,
  Header,
  Input,
  MediaQuery,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import React, { memo } from 'react'
import { MoonIcon, SearchIcon } from '@heroicons/react/outline'
import MyIcon from 'components/MyIcon'
import useStyles from 'styles/useGlobalStyles'
import { BellIcon, SunIcon } from '@heroicons/react/solid'
import MyComp from 'containers/MyComp'
import Link from 'next/link'
import { SidebarToggleType } from 'types/default.dt'

interface Props {
  sticky?: boolean
}

const MyHeader = memo(
  ({ sticky, opened, toggleOpen }: Props & SidebarToggleType) => {
    const is_burger =
      typeof toggleOpen === 'function' && typeof opened === 'boolean'
    const { classes, cx } = useStyles()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const iconStyle = cx(
      classes.icon_secondary_color,
      classes.icon_secondary_fill
    )

    return (
      <Header
        height={'auto'}
        sx={(theme) => ({
          position: sticky ? 'sticky' : 'relative',
          top: 0,
          paddingBlock: 30,
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            paddingBlock: theme.spacing.xl,
            gap: 5,
          },
        })}
      >
        <MyComp>
          <Grid grow align='center' sx={{ flexWrap: 'wrap-reverse' }}>
            <Grid.Col span={12} sm={7.5}>
              <Group spacing='xl' noWrap>
                {is_burger && (
                  <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                    <MediaQuery largerThan='md' styles={{ display: 'none' }}>
                      <Burger
                        opened={opened}
                        onClick={() => toggleOpen((prev) => !prev)}
                      />
                    </MediaQuery>
                  </MediaQuery>
                )}
                <Link href='/' passHref>
                  <Text
                    component='a'
                    transform='uppercase'
                    weight='bolder'
                    size={32}
                    color='indigo'
                  >
                    Morent
                  </Text>
                </Link>
                <Input
                  size='md'
                  radius='xl'
                  styles={(theme) => ({
                    input: {
                      '::placeholder': {
                        color:
                          theme.colorScheme === 'dark'
                            ? theme.colors.text2
                            : theme.colors.icon,
                      },
                    },
                    wrapper: { width: '100%', maxWidth: 500 },
                  })}
                  icon={
                    <SearchIcon
                      width={24}
                      className={classes.icon_secondary_color}
                    />
                  }
                  placeholder='Search something here'
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={12} sm={4.5}>
              <Group
                sx={(theme) => ({
                  justifyContent: 'flex-end',
                  ...(is_burger
                    ? {
                        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                          justifyContent: 'space-between',
                        },
                      }
                    : {}),
                })}
                align='center'
                spacing={20}
              >
                {is_burger && (
                  <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => toggleOpen((prev) => !prev)}
                    />
                  </MediaQuery>
                )}
                <Group spacing={20}>
                  <MyIcon
                    icon={
                      <>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M16.44 3.09998C14.63 3.09998 13.01 3.97998 12 5.32998C10.99 3.97998 9.37 3.09998 7.56 3.09998C4.49 3.09998 2 5.59998 2 8.68998C2 9.87998 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.87998 22 8.68998C22 5.59998 19.51 3.09998 16.44 3.09998Z'
                            className={iconStyle}
                          />
                        </svg>
                      </>
                    }
                    path='/'
                  />
                  <MyIcon
                    icon={<BellIcon className={iconStyle} width={24} />}
                    path='/'
                  />
                  <MyIcon
                    click={() => toggleColorScheme()}
                    icon={
                      colorScheme === 'light' ? (
                        <MoonIcon className={iconStyle} width={24} />
                      ) : (
                        <SunIcon className={iconStyle} width={24} />
                      )
                    }
                  />
                  <Link href='/dashboard' passHref>
                    <Avatar
                      component='a'
                      radius='xl'
                      style={{ width: 44, height: 44 }}
                      src='https://i.scdn.co/image/ab6761610000e5eb0ff4f1b8113d77f33b4db58f'
                    />
                  </Link>
                </Group>
              </Group>
            </Grid.Col>
          </Grid>
        </MyComp>
      </Header>
    )
  }
)
MyHeader.displayName = 'MyHeader'
export default MyHeader
