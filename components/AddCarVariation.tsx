import { Button, Group, Text, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'
import requests from 'requests'
import useInputStyles from 'styles/useInputStyles'

interface Types {
  mutate: () => void
  values: { value: string; label: string }[]
}

const AddCarVariation = ({ mutate, values }: Types) => {
  const { classes } = useInputStyles()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<string>('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isExist = values.find((val) => val.value === value.toLowerCase())
    if (isExist) {
      showNotification({ message: value + ' is already exist', color: 'red' })
      return
    }
    setLoading(true)
    const res = await requests.cars.addCarType(value)
    if (res.message === 'success') {
      showNotification({ message: res.data.name + ' is successfully added' })
      mutate()
    } else {
      showNotification({ message: "Couldn't added the type. Try again!" })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={submit}>
      <TextInput
        mt='xl'
        size='md'
        label={<Text className={classes.label}>Name</Text>}
        placeholder='Car type'
        variant='default'
        classNames={{ input: classes.input }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Group position='right'>
        <Button
          disabled={!value}
          loading={loading}
          type='submit'
          size='md'
          mt='lg'
          radius='sm'
        >
          Add
        </Button>
      </Group>
    </form>
  )
}

export default AddCarVariation
