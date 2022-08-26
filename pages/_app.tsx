import 'styles/global.css'
import type { AppProps } from 'next/app'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core'
import MyGlobalStyles from '../styles/MyGlobalStyles'
import { NotificationsProvider } from '@mantine/notifications'
import { GetServerSidePropsContext } from 'next'
import { getCookie, setCookie } from 'cookies-next'
import { useState } from 'react'
import { NavigationProgress } from '@mantine/nprogress'
import { RouterTransition } from 'components/RouterTransition'

function MyApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)
  const toggleColorScheme = (value: ColorScheme) => {
    const nextColorSchem = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorSchem)
    setCookie('mantine-color-scheme', nextColorSchem, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  const theme: MantineThemeOverride = {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    colorScheme,
    primaryColor: 'indigo',
    colors: {
      body: ['#f6f7f9'],
      icon: ['#3D5278'],
      primary: ['#3563E9'],
      text2: ['#90A3BF'],
      divider: ['#e9ecef', '#2C2E33'],
      star: ['#C3D4E9'],
    },
    components: {
      Container: {
        defaultProps: {
          sizes: {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1140,
            xl: 1600,
          },
        },
      },
    },
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
      >
        <MyGlobalStyles />
        <RouterTransition />
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
})

export default MyApp
