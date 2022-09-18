import { request } from 'requests/request'

const others = {
  upload: (formData: FormData): Promise<{ id: number; path: string }[]> =>
    request
      .post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data),
}
export default others
