import { Box, Divider, Group, Stack, Text } from '@mantine/core'
import MyComp from 'containers/MyComp'
import Link from 'next/link'
import React, { memo } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'

const links = [
  {
    title: 'About',
    items: ['How it works', 'Featured', 'Partnership', 'Bussiness Relation'],
  },
  {
    title: 'Community',
    items: ['Events', 'Blog', 'Podcast', 'Invite a friend'],
  },
  {
    title: 'Socials',
    items: ['Discord', 'Instagram', 'Twitter', 'Facebook'],
  },
]

const MyFooter = memo(() => {
  const { classes } = useGlobalStyles()
  return (
    <Box
      sx={(theme) => ({
        background:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Divider size='xs' className={classes.dividerColor} />
      <MyComp mt={70}>
        <Group position='apart' align='start'>
          <Box>
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
            <Text
              size='lg'
              color='dimmed'
              my='lg'
              sx={{ maxWidth: 350, lineHeight: 2 }}
            >
              Our vision is to provide convenience and help increase your sales
              business.
            </Text>
          </Box>
          <Group mb={50} spacing='xl'>
            {links.map((link, i) => (
              <Box key={i} sx={{ width: 180 }}>
                <Text size='xl'>{link.title}</Text>
                <Stack mt='xl' spacing='sm'>
                  {link.items.map((t, ni) => (
                    <Text color='dimmed' size='lg' key={ni}>
                      {t}
                    </Text>
                  ))}
                </Stack>
              </Box>
            ))}
          </Group>
        </Group>
        <Divider />
        <Group position='apart' align='center' py={50}>
          <Text size='lg'>
            ©{new Date().getFullYear()} MORENT. All rights reserved
          </Text>
          <Group spacing='xl'>
            <Text size='lg'>Privacy & Policy</Text>
            <Text size='lg'>Terms & Condition</Text>
          </Group>
        </Group>
      </MyComp>
    </Box>
  )
})
MyFooter.displayName = 'MyFooter'
export default MyFooter
