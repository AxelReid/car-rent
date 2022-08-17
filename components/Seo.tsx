import React from 'react'

interface Props {
  title?: string
  desc?: string
  img?: string
}

const Seo = ({
  title = 'Morent Car Rental',
  desc = 'Morent Car Rental, Morent Car Rental, Morent Car Rental, Morent Car Rental, Morent Car Rental, Morent Car Rental,',
  img = '/imgs/card1car.png',
}: Props) => {
  return (
    <>
      <title>{title}</title>
      <link rel='icon' href={img} />
      <meta name='description' content={desc} />
      <meta property='og:title' content='Morent Car Rental' />
      <meta property='og:type' content='Website' />
      <meta
        property='og:url'
        content='https://car-rent-with-mantine.vercel.app/'
      />
      <meta property='og:image' content={img} />
      <meta name='robots' content='index, follow' />
    </>
  )
}

export default Seo
