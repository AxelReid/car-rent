import {
  ArrowUpTrayIcon,
  CheckIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import DashboardWrapper from 'components/dashboard/DashboardWrapper'
import UploadImage from 'components/dashboard/UploadImage'
import MyCard from 'components/MyCard'
import BoxTitle from 'components/Rent/BoxTitle'
import RichText from 'components/RichText'
import useAddCarForm from 'hooks/useAddCarForm'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import requests from 'requests'
import useGlobalStyles from 'styles/useGlobalStyles'
import useInputStyles from 'styles/useInputStyles'
import { AddCarFormType } from 'types/admin.dt'
import { AddCarType } from 'types/car.dto'

const AddCarVariation = dynamic(() => import('components/AddCarVariation'))

const Create: NextPage = () => {
  const theme = useMantineTheme()
  const { classes, cx } = useInputStyles()
  const { classes: cls } = useGlobalStyles()
  const [openedImageModal, setOpenedImageModal] = useState(false)
  const { createForm, initialValues } = useAddCarForm()
  const [loading, setLoading] = useState(false)
  const [zoomedImg, setZoomedImg] = useState('')
  const [carTypeModal, setCarTypeModal] = useState(false)
  const [carTypes, setCarTypes] = useState<{ value: string; label: string }[]>(
    []
  )

  useEffect(() => {
    getCarTypes()
  }, [])

  const getCarTypes = async () => {
    const data = await requests.cars.carTypes()
    setCarTypes(data)
  }

  const removeImg = (imgID: number) => {
    const imgs = createForm.values.images
    createForm.setValues({
      ...createForm.values,
      images: imgs.filter((img) => img.id !== imgID),
    })
  }

  const resetForm = () => {
    createForm.setValues(initialValues)
  }

  const submit = async (values: AddCarFormType) => {
    const {
      name,
      description,
      car_type,
      price,
      discount,
      images,
      gasoline,
      steering,
      capacity,
    } = values
    const newCar: AddCarType = {
      name,
      description,
      car_type,
      price,
      discount: discount || 0,
      images: images.map((img) => img.id).join(','),
      specs: {
        gasoline,
        steering,
        capacity,
      },
    }
    setLoading(true)
    try {
      const res = await requests.cars.add(newCar)
      showNotification({
        title: 'New car rental',
        message: res.message,
        autoClose: 3000,
        icon: <CheckIcon width={18} strokeWidth={2} />,
        color: 'green',
      })
    } catch (error) {
      showNotification({
        title: 'New car rental',
        message: 'Something went wrong while adding ' + name,
        autoClose: 3000,
        icon: <XMarkIcon width={18} strokeWidth={2} />,
        color: 'red',
      })
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <>
      <Modal
        opened={openedImageModal}
        onClose={() => setOpenedImageModal(false)}
        centered
        size='1000px'
        overlayColor={
          theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
        title={
          <Text className={classes.label} m={0}>
            Uploads
          </Text>
        }
      >
        <UploadImage
          createForm={createForm}
          closeModal={() => setOpenedImageModal(false)}
        />
      </Modal>
      <Modal
        opened={!!zoomedImg}
        onClose={() => setZoomedImg('')}
        centered
        size='1000px'
        overlayColor={
          theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
        title={
          <Text className={classes.label} m={0}>
            Image Preview
          </Text>
        }
      >
        <Image
          src={zoomedImg}
          width={1000}
          height={600}
          alt='img preview'
          objectFit='contain'
          layout='intrinsic'
          priority
        />
      </Modal>
      <Modal
        opened={carTypeModal}
        onClose={() => setCarTypeModal(false)}
        centered
        overlayColor={
          theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
        title={
          <Text className={classes.label} m={0}>
            Add new car type
          </Text>
        }
      >
        <AddCarVariation values={carTypes} mutate={getCarTypes} />
      </Modal>
      <DashboardWrapper>
        <MyCard>
          <BoxTitle title='Create a rental' desc='' />
          <form onSubmit={createForm.onSubmit(submit)}>
            <Stack mt='xl' spacing='md'>
              <Grid align='end' grow>
                <Grid.Col span={12} xs={7}>
                  <TextInput
                    size='md'
                    label={<Text className={classes.label}>Name</Text>}
                    placeholder='Car name'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    {...createForm.getInputProps('name')}
                  />
                </Grid.Col>
                <Grid.Col span={12} xs={4} sx={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 10, top: 7 }}>
                    <ActionIcon
                      className={classes.inputBg}
                      variant='light'
                      radius={5}
                      p={4}
                      onClick={() => setCarTypeModal(true)}
                    >
                      <PlusIcon width={20} />
                    </ActionIcon>
                  </div>
                  <Select
                    size='md'
                    label={<Text className={classes.label}>Car type</Text>}
                    placeholder='Car type'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    data={carTypes}
                    {...createForm.getInputProps('car_type')}
                  />
                </Grid.Col>
              </Grid>
              <Box>
                <Text className={classes.label}>Description</Text>
                <RichText
                  {...createForm.getInputProps('description')}
                  error={createForm.errors?.description}
                />
              </Box>
              <Box>
                <Text className={classes.label}>Images</Text>
                <Group spacing='xs'>
                  <UnstyledButton
                    className={cx(cls.imgPreview, classes.inputBg)}
                    sx={(theme) => ({
                      width: 90,
                      minWidth: 90,
                      height: 90,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dashed',
                      borderColor:
                        theme.colors.cyan[theme.colorScheme === 'dark' ? 9 : 4],
                    })}
                    onClick={() => setOpenedImageModal(true)}
                  >
                    <Text color='dimmed'>
                      <ArrowUpTrayIcon width={20} />
                    </Text>
                    <Text color='dimmed' size='xs' align='center'>
                      Select
                    </Text>
                  </UnstyledButton>

                  {createForm.values.images.length
                    ? createForm.values.images.map((img) => (
                        <div
                          key={img.id}
                          className={cls.imgPreview}
                          style={{ width: 90, height: 90 }}
                        >
                          <div className='inner-icon'>
                            <Group spacing={3}>
                              <ActionIcon
                                color='cyan'
                                radius='xl'
                                variant='subtle'
                                onClick={() => setZoomedImg(img.path)}
                              >
                                <EyeIcon width={20} />
                              </ActionIcon>
                              <ActionIcon
                                color='red'
                                radius='xl'
                                variant='subtle'
                                onClick={() => removeImg(img.id)}
                              >
                                <TrashIcon width={20} />
                              </ActionIcon>
                            </Group>
                          </div>
                          <Image
                            key={img.id}
                            src={img.path}
                            width={90}
                            height={90}
                            alt='img'
                            objectFit='cover'
                          />
                        </div>
                      ))
                    : null}
                </Group>
              </Box>
              <Grid>
                <Grid.Col span={12} xs={6}>
                  <NumberInput
                    size='md'
                    label={<Text className={classes.label}>Price</Text>}
                    placeholder='Last Price($)'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    {...createForm.getInputProps('price')}
                  />
                </Grid.Col>
                <Grid.Col span={12} xs={6}>
                  <NumberInput
                    size='md'
                    label={<Text className={classes.label}>Discount</Text>}
                    placeholder='Price($) before discount'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    {...createForm.getInputProps('discount')}
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={12} xs={4}>
                  <NumberInput
                    size='md'
                    label={<Text className={classes.label}>Gasoline</Text>}
                    placeholder='Consuption (L)'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    {...createForm.getInputProps('gasoline')}
                  />
                </Grid.Col>
                <Grid.Col span={12} xs={4}>
                  <Select
                    size='md'
                    label={<Text className={classes.label}>Steering</Text>}
                    placeholder='Control type'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    {...createForm.getInputProps('steering')}
                    defaultChecked='manual'
                    data={[
                      { value: 'manual', label: 'Manual' },
                      { value: 'auto', label: 'Auto' },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={12} xs={4}>
                  <NumberInput
                    size='md'
                    label={<Text className={classes.label}>Capacity</Text>}
                    placeholder='Capacity (n.o people)'
                    variant='filled'
                    classNames={{ input: classes.input }}
                    {...createForm.getInputProps('capacity')}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
            <Group position='right' mt='xl'>
              <Button
                variant='default'
                type='reset'
                size='md'
                radius='sm'
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button loading={loading} type='submit' size='md' radius='sm'>
                Add Rental
              </Button>
            </Group>
          </form>
        </MyCard>
      </DashboardWrapper>
    </>
  )
}

export default Create
