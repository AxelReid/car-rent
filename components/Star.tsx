import { Group, useMantineTheme } from '@mantine/core'
import React, { memo } from 'react'

type Props = { rating: number }

const Star = memo(({ rating = 0 }: Props) => {
  const theme = useMantineTheme()

  return (
    <Group noWrap spacing={3}>
      {[...Array(5)].map((_, i: number) => (
        <svg
          key={i}
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.16664 2.65835C9.22421 2.47581 9.33846 2.31638 9.49281 2.20321C9.64717 2.09004 9.83358 2.02902 10.025 2.02902C10.2164 2.02902 10.4028 2.09004 10.5571 2.20321C10.7115 2.31638 10.8257 2.47581 10.8833 2.65835L12.4333 7.42501H17.4333C17.6315 7.41752 17.8268 7.47513 17.9892 7.58905C18.1516 7.70296 18.2723 7.86692 18.3327 8.05586C18.3932 8.24481 18.3902 8.44835 18.324 8.63539C18.2579 8.82244 18.1324 8.9827 17.9666 9.09168L13.9083 12.0333L15.4583 16.8083C15.5196 16.9902 15.5212 17.187 15.4627 17.3698C15.4043 17.5526 15.2889 17.712 15.1335 17.8246C14.9781 17.9372 14.7907 17.9972 14.5988 17.9958C14.4068 17.9943 14.2204 17.9316 14.0666 17.8167L9.99998 14.8417L5.94164 17.7917C5.7879 17.9066 5.60145 17.9693 5.40951 17.9708C5.21758 17.9722 5.03022 17.9122 4.87479 17.7996C4.71936 17.687 4.604 17.5276 4.54557 17.3448C4.48713 17.162 4.48868 16.9652 4.54998 16.7833L6.09998 12.0083L2.04164 9.06668C1.87588 8.9577 1.75035 8.79744 1.68424 8.61039C1.61813 8.42335 1.61508 8.21981 1.67554 8.03086C1.736 7.84192 1.85666 7.67796 2.01907 7.56405C2.18149 7.45013 2.37673 7.39252 2.57498 7.40002H7.57498L9.16664 2.65835Z'
            stroke={
              i >= rating
                ? theme.colorScheme === 'dark'
                  ? String(theme.colors.icon)
                  : String(theme.colors.star[0])
                : undefined
            }
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill={i >= rating ? undefined : '#FBAD39'}
          />
        </svg>
      ))}
    </Group>
  )
})
Star.displayName = 'Star'
export default Star
