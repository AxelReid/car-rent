const guard = (permissions?: string[]) => {
  const userPer = process.env.NEXT_PUBLIC_LOCAL_PERMISSION
  return !permissions ? true : userPer ? permissions.includes(userPer) : false
}
export default guard
// npm install @emotion/react @emotion/server @heroicons/react @mantine/carousel @mantine/core @mantine/dates @mantine/dropzone @mantine/form @mantine/hooks @mantine/next @mantine/notifications @mantine/nprogress @mantine/rte axios cookies-next dayjs embla-carousel-autoplay embla-carousel-react next react react-dom react-input-mask sharp
