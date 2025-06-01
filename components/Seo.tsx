import React from "react";

interface Props {
  title?: string;
  desc?: string;
  img?: string;
}

const Seo = ({
  title = "Carrent - Car Rental",
  desc = "Car rental platform",
  img = "/imgs/card1car.png",
}: Props) => {
  return (
    <>
      <title>{title}</title>
      <link rel="icon" href={img} />
      <meta name="description" content={desc} />
      <meta property="og:title" content="Carrent - Car Rental" />
      <meta property="og:type" content="Website" />
      <meta
        property="og:url"
        content="https://car-rent-with-mantine.vercel.app/"
      />
      <meta property="og:image" content={img} />
      <meta name="robots" content="index, follow" />
    </>
  );
};

export default Seo;
