import React from 'react'
import { Box, Divider, Group, Tabs, Text } from '@mantine/core'
import {
  ArrowUpTrayIcon,
  FolderOpenIcon,
  InboxArrowDownIcon,
} from '@heroicons/react/24/outline'
import Browse from './Browse'
import UploadNew from './UploadNew'

type Props = {}

const UploadImage = (props: Props) => {
  return (
    <>
      <Tabs defaultValue='browse'>
        <Tabs.List>
          <Tabs.Tab icon={<FolderOpenIcon width={20} />} value='browse'>
            Browse
          </Tabs.Tab>
          <Tabs.Tab icon={<ArrowUpTrayIcon width={20} />} value='upload'>
            Upload New
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='browse'>
          <Box mt='lg'>
            <Browse />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value='upload'>
          <Box mt='lg'>
            <UploadNew />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default UploadImage
