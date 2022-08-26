import React, { memo, useCallback, useState } from 'react'
import { useDidUpdate } from '@mantine/hooks'
import { CarCardTypes, DataInfo } from 'types/car.dto'
import requests from 'requests'
import Cars from './Cars'

const Recommended = memo(() => {
  const [cars, setCars] = useState<CarCardTypes[]>([])
  const [info, setInfo] = useState<DataInfo>({ total: 0, current: 0, page: 1 })
  const [loading, setLoading] = useState(false)

  const load = useCallback(
    async (next: boolean = false) => {
      setLoading(true)
      try {
        const res = await requests.cars.recommended({
          page: next ? info.page++ : info.page,
        })
        const data = res.data
        setCars((prev) => [...prev, ...data.data])
        setInfo({ total: data.total, current: data.current, page: data.page })
        console.log(data)
      } catch (error: any) {
        console.error(error.response)
      }
      setLoading(false)
    },
    [info.page]
  )

  // useShallowEffect(() => {
  //   load()
  // }, [])

  useDidUpdate(() => {
    load()
  }, [])

  return (
    <Cars
      cars={cars}
      title='Recomandation Cars'
      loadMore={() => load(true)}
      info={info}
      loading={loading}
    />
  )
})
Recommended.displayName = 'Recommended'
export default Recommended
