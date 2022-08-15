import React, { memo } from 'react'
import Link from 'next/link'
import { ActionIcon } from '@mantine/core'

interface Props {
  icon: React.ReactNode
  path?: string
  click?: () => void
}
const MyIcon = memo(({ icon, path, click }: Props) => {
  return path ? (
    <Link href={path}>
      <ActionIcon
        component='a'
        radius='xl'
        style={{ width: 44, height: 44 }}
        variant='default'
      >
        {icon}
      </ActionIcon>
    </Link>
  ) : (
    <ActionIcon
      onClick={click}
      radius='xl'
      style={{ width: 44, height: 44 }}
      variant='default'
    >
      {icon}
    </ActionIcon>
  )
})
MyIcon.displayName = 'MyIcon'
export default MyIcon
