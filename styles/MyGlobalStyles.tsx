import { Global } from '@mantine/core'

const MyGlobalStyles = () => {
  return (
    <Global
      styles={(theme) => ({
        body: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark
              : theme.colors.body,
        },
      })}
    />
  )
}
export default MyGlobalStyles
