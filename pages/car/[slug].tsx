import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps } from "next";
import { Badge, Group, Stack, Title } from "@mantine/core";
import CarDetail from "components/Car/CarDetail";
import Review from "components/Car/Review";
import MyComp from "containers/MyComp";
import MyFooter from "layouts/MyFooter";
import MyHeader from "layouts/MyHeader";
import { CarDetails } from "types/car.dto";
import requests from "requests";
import MyCard from "components/MyCard";
import useRecentCars from "hooks/useRecentCars";
import cars from "data/cars";
import { shuffleArray } from "utils";

const CarsSlider = dynamic(() => import("containers/CarsSlider"));

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await requests.cars.slugs()).map((slug) => ({ params: slug }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const carSlug = params?.slug;
  try {
    const carDetail = await requests.cars.details(carSlug || "");
    const status = carDetail.status;

    if (status === 200) {
      return {
        props: {
          status,
          car: carDetail.data,
        },
      };
    }
    return {
      props: {
        status,
        car: null,
      },
    };
  } catch (error) {
    return {
      props: {
        car: null,
        status: 500,
      },
    };
  }
};

type Props = { car: CarDetails; status: number };

const generateReview = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  const dateLabel = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return {
    date: dateLabel,
    rating: Math.round(Math.random() * 5),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore asperiores quis eaque accusantium nostrum facere minus dolor",
    user: {
      name: "Mahmoud",
      bio: "Reviwer",
      avatar: "",
    },
  };
};

const reviews = Array.from({ length: 4 }, () => generateReview());

const Car = ({ car, status }: Props) => {
  const { recentCars, saveToRecent } = useRecentCars();

  useEffect(() => {
    if (status === 200) {
      saveToRecent(car.id, car);
    }
  }, [car]);

  return (
    <>
      <MyHeader />
      <MyComp pt={30} mb="xl">
        <Stack spacing="xl">
          {status === 200 ? (
            <>
              <CarDetail {...car} />
              <MyCard>
                <Group>
                  <Title order={3}>Reviews</Title>
                  <Badge size="xl" radius="md" variant="filled">
                    {reviews.length}
                  </Badge>
                </Group>
                <Stack mt="xl" spacing={25}>
                  {reviews.map((review, i) => (
                    <Review key={i} {...review} />
                  ))}
                </Stack>
              </MyCard>
            </>
          ) : status === 404 ? (
            "Not found"
          ) : (
            "Something wrong this status code " + status
          )}
          <CarsSlider data={recentCars} title="Recent Cars" />
          <CarsSlider
            data={shuffleArray(cars).slice(0, 6)}
            title="Recomendation Cars"
            link="/filter"
          />
        </Stack>
      </MyComp>
      <MyFooter />
    </>
  );
};

export default Car;
