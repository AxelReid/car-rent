import { createStyles } from '@mantine/core'

const useInputStyles = createStyles((theme, _params, getRef) => ({
  input: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    padding: '0 20px',
    borderRadius: 9,
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },
  input2bg: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
  },
  label: {
    fontSize: theme.fontSizes.md,
    marginBottom: 12,
    fontWeight: 600,
  },
}))
export default useInputStyles
