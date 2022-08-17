import 'styles/global.css'
import type { AppProps } from 'next/app'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core'
import MyGlobalStyles from '../styles/MyGlobalStyles'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import Seo from 'components/Seo'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'))
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
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
