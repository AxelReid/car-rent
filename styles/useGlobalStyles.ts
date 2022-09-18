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

  bgCover: {
    position: 'relative',
    '::before': {
      position: 'absolute',
      width: '50%',
      left: 0,
      top: 0,
      height: '100%',
      background:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      content: '""',
      zIndex: -1,
    },
  },

  imgPreview: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[7]
        : theme.colors.gray[4],
    '.inner-icon': {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.fn.rgba(theme.black, 0.6),
    },
    '&:hover .inner-icon': {
      display: 'flex',
    },
  },
}))
export default useGlobalStyles
