import React, { useEffect, useState } from 'react'
import { Box, Button, Tabs } from '@mantine/core'
import { ArrowUpTrayIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import Browse from './Browse'
import UploadNew from './UploadNew'
import requests from 'requests'
import { UploadImgType } from 'types/default.dt'
import { UseFormReturnType } from '@mantine/form'
import { AddCarFormType } from 'types/admin.dt'

interface Props {
  closeModal: () => void
  createForm: UseFormReturnType<AddCarFormType>
}

const UploadImage = ({ closeModal, createForm }: Props) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse')
  const [images, setImages] = useState<UploadImgType[] | null>(null)

  const fetchImages = async () => {
    try {
      const res = await requests.admin.getImages()
      setImages(res)
    } catch (error) {
      setImages([])
      console.error(error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <>
      <Tabs
        value={activeTab}
        onTabChange={(val: 'browse' | 'upload') => setActiveTab(val)}
      >
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
            <Browse
              images={images}
              closeModal={closeModal}
              createForm={createForm}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value='upload'>
          <Box mt='lg'>
            <UploadNew setActiveTab={setActiveTab} fetchImages={fetchImages} />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default UploadImage
