import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  ScrollArea,
  Skeleton,
  Text,
} from '@mantine/core'
import Image from 'next/image'
import React, { useState } from 'react'
import useGlobalStyles from 'styles/useGlobalStyles'
import { UploadImgType } from 'types/default.dt'
import { AddCarFormType } from 'types/admin.dt'
import { UseFormReturnType } from '@mantine/form'

interface Props {
  images: UploadImgType[] | null
  closeModal: () => void
  createForm: UseFormReturnType<AddCarFormType>
}

const Browse = ({ images, closeModal, createForm }: Props) => {
  const { classes } = useGlobalStyles()
  const [selectedImages, setSelectedImages] = useState<UploadImgType[]>(
    createForm.values.images || []
  )

  const removeImg = (id: number) =>
    setSelectedImages((prev) => prev!.filter((img) => img.id !== id))

  const getImages = () => {
    createForm.setValues({ ...createForm.values, images: selectedImages! })
    closeModal()
  }

  return (
    <div>
      {images === null ? (
        <Group>
          <Skeleton width={110} height={110} radius='md' />
          <Skeleton width={110} height={110} radius='md' />
          <Skeleton width={110} height={110} radius='md' />
        </Group>
      ) : images.length ? (
        <Group mb='sm' spacing='xs'>
          {images.map((img, i) => {
            const isSelected =
              selectedImages?.findIndex(
                (selectedImg) => selectedImg.id === img.id
              ) !== -1
            return (
              <div
                key={i}
                className={classes.imgPreview}
                style={{ width: 110, height: 110 }}
              >
                <div className='inner-icon'>
                  <ActionIcon
                    radius='xl'
                    variant='transparent'
                    onClick={() => {
                      isSelected
                        ? removeImg(img.id)
                        : setSelectedImages((prev) => [...prev, img])
                    }}
                  >
                    {isSelected ? (
                      <TrashIcon width={30} color='white' />
                    ) : (
                      <PlusCircleIcon width={30} color='white' />
                    )}
                  </ActionIcon>
                </div>
                <Image
                  src={img.path}
                  width={110}
                  height={110}
                  alt={''}
                  objectFit='cover'
                />
              </div>
            )
          })}
        </Group>
      ) : (
        <Text color='dimmed' size='sm' align='center'>
          No uploaded images
        </Text>
      )}

      {selectedImages.length ? (
        <ScrollArea mt='lg'>
          <Divider variant='dashed' />
          <Group mb='sm' mt='lg' spacing='xs' noWrap>
            {selectedImages.map((file, i) => {
              return (
                <div key={i} className={classes.imgPreview}>
                  <div className='inner-icon'>
                    <ActionIcon
                      radius='xl'
                      variant='transparent'
                      onClick={() => removeImg(file.id)}
                    >
                      <TrashIcon width={18} color='white' />
                    </ActionIcon>
                  </div>
                  <Image
                    src={file.path}
                    width={80}
                    height={80}
                    alt='image'
                    objectFit='cover'
                  />
                </div>
              )
            })}
          </Group>
        </ScrollArea>
      ) : null}
      <Group mt='md' position='right'>
        <Button size='md' disabled={!selectedImages.length} onClick={getImages}>
          Select
        </Button>
      </Group>
    </div>
  )
}

export default Browse
