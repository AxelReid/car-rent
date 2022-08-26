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
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import Image from 'next/image'
import React, { useState } from 'react'

const useStyles = createStyles((theme) => ({
  preview: {
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
    '.trash-icon': {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.fn.rgba(theme.black, 0.6),
    },
    '&:hover .trash-icon': {
      display: 'flex',
    },
  },
}))

const UploadNew = () => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  const [uploadedFiles, setFiles] = useState<File[]>([])

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

  return (
    <>
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
                <Box key={i} m={0} className={classes.preview}>
                  <div className='trash-icon'>
                    <ActionIcon
                      radius='xl'
                      variant='transparent'
                      onClick={() => removeImg(file.name)}
                    >
                      <TrashIcon width={18} color='white' />
                    </ActionIcon>
                  </div>
                  <Image
                    src={URL.createObjectURL(file)}
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
        <Button size='md'>Upload</Button>
      </Group>
    </>
  )
}

export default UploadNew
