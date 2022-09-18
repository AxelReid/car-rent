import { useForm } from '@mantine/form'
import { AddCarFormType } from 'types/admin.dt'

const useAddCarForm = () => {
  const initialValues: AddCarFormType = {
    name: '',
    car_type: '',
    description: '',
    images: [],
    price: null,
    discount: null,
    gasoline: null,
    steering: 'manual',
    capacity: null,
  }

  const createForm = useForm<AddCarFormType>({
    initialValues,
    validate: {
      name: (value) => (value.length < 1 ? 'Please provide a name' : null),
      car_type: (value) => (!value ? 'Please select a type' : null),
      description: (value) => {
        const p = document.createElement('p')
        p.innerHTML = value
        const val = p.innerText
        p.remove()
        return !val ? 'Please enter a description' : null
      },
      price: (value: number | null) =>
        !value ? 'Please specify a price' : null,
      gasoline: (value: number | null) =>
        !value ? 'Please specify a price' : null,
      capacity: (value: number | null) =>
        !value ? 'Please specify a capacity' : null,
    },
  })
  return { createForm, initialValues }
}
export default useAddCarForm
