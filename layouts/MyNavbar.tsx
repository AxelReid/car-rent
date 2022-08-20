import {
  Box,
  Drawer,
  Group,
  Navbar,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core'
import React, { memo } from 'react'
import { SidebarToggleType } from 'types/default.dt'

type Props = {
  sticky?: boolean
  children: React.ReactNode
  bottomSection?: React.ReactNode
}

const MyNavbar = memo(
  ({
    sticky,
    children,
    bottomSection = null,
    opened,
    toggleOpen,
  }: Props & SidebarToggleType) => {
    const theme = useMantineTheme()

    return (
      <>
        <Drawer
          overlayColor={
            theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
          }
          overlayOpacity={0.3}
          overlayBlur={3}
          size={300}
          opened={opened || false}
          onClose={() => toggleOpen && toggleOpen(false)}
        >
          <Group
            position='apart'
            align='stretch'
            sx={{ flexDirection: 'column', height: 'calc(100% - 45px)' }}
            spacing={0}
          >
            <ScrollArea p='lg' sx={{ flex: 1 }}>
              {children}
            </ScrollArea>
            {bottomSection && (
              <Box p='lg' pt={0}>
                {bottomSection}
              </Box>
            )}
          </Group>
        </Drawer>
        <Navbar
          sx={{
            position: sticky ? 'sticky' : 'relative',
            top: 110,
            zIndex: 0,
            height: 'calc(100vh - 110px)',
          }}
          hiddenBreakpoint='md'
          hidden
          width={{ md: 300 }}
        >
          <Navbar.Section p='lg' grow component={ScrollArea}>
            {children}
          </Navbar.Section>
          {bottomSection && (
            <Navbar.Section p='lg' pt={0}>
              {bottomSection}
            </Navbar.Section>
          )}
        </Navbar>
      </>
    )
  }
)
MyNavbar.displayName = 'MyNavbar'
export default MyNavbar
