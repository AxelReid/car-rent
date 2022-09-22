const emptyArr = (num: number = 5) =>
  [...Array(num)].map((_, i) => ({ id: i + 1 }))
export default emptyArr
