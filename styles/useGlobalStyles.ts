import { createStyles } from '@mantine/core'

const useGlobalStyles = createStyles((theme, _params, getRef) => ({
  bgCard: {
    background:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  bgBody: {
    background:
      theme.colorScheme === 'dark' ? theme.colors.dark : theme.colors.body,
  },
  secondary_color: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.text2 : theme.colors.icon,
  },
  icon_secondary_color: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.text2 : theme.colors.icon,
  },
  icon_secondary_fill: {
    fill: theme.colorScheme === 'dark' ? theme.colors.text2 : theme.colors.icon,
  },
  dividerColor: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.divider[1]
        : theme.colors.divider[0],
  },
  boxBg: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },
  boxBg_active: {
    '&[data-active]': {
      border: 'none',
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    },
  },
}))
export default useGlobalStyles
