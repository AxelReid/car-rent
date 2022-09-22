import { useLocalStorage } from '@mantine/hooks'
import { useCallback } from 'react'
import { CarCardTypes } from 'types/car.dto'

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
      setRecentCars((prev) => {
        const isExist = prev.findIndex((car) => car.id === carId) !== -1
        if (!isExist) {
          car.image = car?.images?.length ? car.images[0] : ''
          return [car, ...prev.slice(0, 4)]
        }
        return prev
      })
    },
    [setRecentCars]
  )

  return { recentCars, saveToRecent }
}
