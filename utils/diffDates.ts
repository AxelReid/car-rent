export const getDifferenceInDays = (
  from: string | Date,
  to: string | Date,
  time_from: string | Date | null,
  time_to: string | Date | null
) => {
  const convert_to_date = (date_string: string | Date) => new Date(date_string)

  const from_obj = (date: string | Date, time: string | Date | null) => ({
    min: !time ? 0 : convert_to_date(time).getMinutes(),
    hour: !time ? 0 : convert_to_date(time).getHours(),
    day: convert_to_date(date).getDate(),
    month: convert_to_date(date).getMonth(),
    year: convert_to_date(date).getFullYear(),
  })

  const format = ({ min, hour, day, month, year }: { [key: string]: number }) =>
    `${month}/${day}/${year} ${hour}:${min}`

  const get_from_obj = from_obj(from, time_from)
  const get_to_obj = from_obj(to, time_to)

  const result_from = format(get_from_obj)
  const result_to = format(get_to_obj)

  const date_from = new Date(result_from).getTime()
  const date_to = new Date(result_to).getTime()
  const diffInMs = Math.abs(date_from - date_to)

  return {
    diff: Math.floor(diffInMs / (1000 * 60 * 60 * 24)),
    from: result_from,
    to: result_to,
  }
}
