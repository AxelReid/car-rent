import {
  Box,
  Button,
  Grid,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import DashboardWrapper from 'components/dashboard/DashboardWrapper'
import UploadImage from 'components/dashboard/UploadImage'
import MyCard from 'components/MyCard'
import BoxTitle from 'components/Rent/BoxTitle'
import RichText from 'components/RichText'
import { NextPage } from 'next'
import React, { useState } from 'react'
import useInputStyles from 'styles/useInputStyles'

const Create: NextPage = () => {
  const theme = useMantineTheme()
  const { classes } = useInputStyles()
  const [value, onChange] = useState('')
  const [openedImageModal, setOpenedImageModal] = useState(false)

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
        <UploadImage />
      </Modal>
      <DashboardWrapper>
        <MyCard>
          <BoxTitle title='Create a rental' desc='' />
          <Stack mt='xl' spacing='md'>
            <Grid>
              <Grid.Col span={12} xs={8}>
                <TextInput
                  size='md'
                  label={<Text className={classes.label}>Name</Text>}
                  placeholder='Car name'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
              <Grid.Col span={12} xs={4}>
                <TextInput
                  size='md'
                  label={<Text className={classes.label}>Car type</Text>}
                  placeholder='type'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
            </Grid>
            <Box>
              <Text className={classes.label}>Description</Text>
              <RichText value={value} onChange={onChange} />
            </Box>
            <Box>
              <Text className={classes.label}>Images</Text>
              <Group noWrap>
                <Button
                  variant='default'
                  radius={7}
                  size='sm'
                  onClick={() => setOpenedImageModal(true)}
                >
                  Select images
                </Button>
              </Group>
            </Box>
            <Grid>
              <Grid.Col span={12} xs={6}>
                <NumberInput
                  size='md'
                  label={<Text className={classes.label}>Price</Text>}
                  placeholder='price($)'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
              <Grid.Col span={12} xs={6}>
                <NumberInput
                  size='md'
                  label={<Text className={classes.label}>Discount</Text>}
                  placeholder='Discount price($)'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
            </Grid>
            <Grid>
              <Grid.Col span={12} xs={4}>
                <TextInput
                  size='md'
                  label={<Text className={classes.label}>Gasoline</Text>}
                  placeholder='type'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
              <Grid.Col span={12} xs={4}>
                <TextInput
                  size='md'
                  label={<Text className={classes.label}>Steering</Text>}
                  placeholder='type'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
              <Grid.Col span={12} xs={4}>
                <NumberInput
                  size='md'
                  label={<Text className={classes.label}>Capacity</Text>}
                  placeholder='Discount price($)'
                  variant='filled'
                  classNames={{ input: classes.input }}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </MyCard>
      </DashboardWrapper>
    </>
  )
}

export default Create
