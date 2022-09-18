import { useLocalStorage } from '@mantine/hooks'
import { useCallback } from 'react'
import { CarCardTypes, CarDetails } from 'types/car.dto'

export default function useRecentCars() {
  const [recentCars, setRecentCars] = useLocalStorage<CarCardTypes[]>({
    key: 'recent-cars',
    defaultValue: [],
    serialize: (value) => {
      return JSON.stringify(value)
    },
    deserialize(value) {
      return JSON.parse(value || '[]')
    },
  })

  const saveToRecent = useCallback(
    (carId: number, car: any) => {
      const isExist = recentCars.findIndex((car) => car.id === carId) !== -1
      if (!isExist) {
        car.image = car?.images?.length ? car.images[0] : ''
        setRecentCars([car, ...recentCars])
      }
    },
    [recentCars, setRecentCars]
  )

  return { recentCars, saveToRecent }
}
