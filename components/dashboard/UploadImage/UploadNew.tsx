import {
  ArrowUpTrayIcon,
  PhotoIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import Image from 'next/image'
import React, { useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import { UploadImgType } from 'types/default.dt'
import { upload } from 'utils/upload'

interface Props {
  fetchImages: () => Promise<void>
  setActiveTab: React.Dispatch<React.SetStateAction<'browse' | 'upload'>>
}

const UploadNew = ({ fetchImages, setActiveTab }: Props) => {
  const theme = useMantineTheme()
  const { classes } = useGlobalStyles()
  const [uploadedFiles, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleUploads = (files: File[]) => {
    const uniqueOj = [...uploadedFiles, ...files].filter(
      (file, index, self) =>
        index ===
        self.findIndex((t) => t.name === file.name && t.size === file.size)
    )
    setFiles(uniqueOj)
  }

  const removeImg = (name: string) =>
    setFiles((prev) => prev.filter((file) => file.name !== name))

  const upload_finish = async () => {
    setLoading(true)
    await upload(uploadedFiles)
    fetchImages()
    setActiveTab('browse')
    setFiles([])
    setLoading(false)
  }

  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Dropzone
        onDrop={handleUploads}
        onReject={(files) => console.log(files)}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <ArrowUpTrayIcon
              width={50}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <XCircleIcon
              width={50}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <PhotoIcon width={50} />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Drag images here or click to select files
            </Text>
            <Text size='sm' color='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {uploadedFiles.length ? (
        <ScrollArea mt='lg'>
          <Group mb='sm' spacing='xs' noWrap>
            {uploadedFiles.map((file, i) => {
              const link = URL.createObjectURL(file)
              return (
                <Box key={i} m={0} className={classes.imgPreview}>
                  <div className='inner-icon'>
                    <ActionIcon
                      radius='xl'
                      variant='transparent'
                      onClick={() => removeImg(file.name)}
                    >
                      <TrashIcon width={18} color='white' />
                    </ActionIcon>
                  </div>
                  <Image
                    src={link}
                    onLoad={() => URL.revokeObjectURL(link)}
                    width={80}
                    height={80}
                    alt={file.name}
                    objectFit='cover'
                  />
                </Box>
              )
            })}
          </Group>
        </ScrollArea>
      ) : null}
      <Group mt='md' position='right'>
        <Button
          size='md'
          disabled={!uploadedFiles.length}
          onClick={upload_finish}
        >
          Upload
        </Button>
      </Group>
    </>
  )
}

export default UploadNew
