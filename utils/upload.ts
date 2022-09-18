import axios from 'axios'
import requests from 'requests'

export const upload = async (images: File[]) => {
  try {
    const imgs = await axios.all(
      images.map(async (image) => {
        let formData = new FormData()
        formData.append('path', image)
        const res = await requests.others.upload(formData)
        return res
      })
    )
    return imgs
  } catch (error) {
    console.error(error)
    return []
  }
}
