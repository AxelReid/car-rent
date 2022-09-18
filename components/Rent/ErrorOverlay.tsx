import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button, Group, Overlay, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  showRefreshBtn: boolean
}

const ErrorOverlay = ({ showRefreshBtn }: Props) => {
  const router = useRouter()

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          paddingTop: 'max(150px,10%)',
        }}
      >
        <Stack align='center'>
          <ExclamationCircleIcon
            width={150}
            strokeWidth={0.4}
            opacity={0.7}
            color='#ff6c6c'
          />
          <Text size='xl' align='center' weight={600}>
            This car may not be availbale right now
          </Text>
          <Group>
            <Link href='/filter' passHref>
              <a>
                <Button size='lg' radius='md'>
                  Choose another car
                </Button>
              </a>
            </Link>
            {showRefreshBtn && (
              <Button
                size='lg'
                radius='md'
                variant='default'
                onClick={() => router.reload()}
              >
                Refresh the page
              </Button>
            )}
          </Group>
        </Stack>
      </div>
      <Overlay zIndex={9} blur={7} color='' />
    </div>
  )
}

export default ErrorOverlay
