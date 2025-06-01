import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  Image,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import MyCard from "components/MyCard";
import Star from "components/Star";
import Link from "next/link";
import React, { useState } from "react";
import useGlobalStyles from "styles/useGlobalStyles";
import { CarDetails } from "types/car.dto";

const useCardStyles = createStyles((theme) => ({
  nonActive: { border: "none", cursor: "pointer" },
  active: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.colors.indigo,
    padding: "20px !important",
  },
  sticky: {
    position: "sticky",
    top: 20,
  },
}));

const CarDetail = ({
  name,
  description,
  car_type,
  images,
  price,
  rating,
  in_wishlist,
  specs,
  discount,
  slug,
}: CarDetails) => {
  const { classes } = useGlobalStyles();
  const { classes: cardClasses, cx } = useCardStyles();
  const [selectedImg, setImage] = useState(images ? images[0] : "");
  const [imgError, setImgError] = useState(!images?.length);

  return (
    <Grid align="stretch" gutter={25}>
      <Grid.Col span={12} sm={6} lg={5}>
        <Box className={cardClasses.sticky}>
          <AspectRatio ratio={16 / 10}>
            <Card radius="lg" p={0}>
              {imgError ? (
                <PhotoIcon width={"45%"} strokeWidth={0.2} opacity={0.2} />
              ) : (
                <Image src={selectedImg} alt={name} />
              )}
            </Card>
          </AspectRatio>
          <Grid mt="sm" gutter={25}>
            {images?.map((img, i) => (
              <Grid.Col key={i} span={4}>
                <AspectRatio ratio={1 / 0.8}>
                  <Card
                    component="button"
                    radius="lg"
                    className={cx(cardClasses.nonActive, {
                      [cardClasses.active]: selectedImg === img,
                    })}
                    onClick={() => setImage(img)}
                  >
                    <Card.Section>
                      <Image p="sm" src={img} alt={name} />
                    </Card.Section>
                  </Card>
                </AspectRatio>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Grid.Col>
      <Grid.Col span={12} sm={6} lg={7}>
        <MyCard>
          <Group position="apart" align="start">
            <Box>
              <Title order={1}>{name}</Title>
              <Group mt="xs" align="center">
                <Star rating={4} />
                <Text className={classes.secondary_color} size="sm">
                  {rating.total} Reviews
                </Text>
              </Group>
            </Box>
            <ActionIcon radius="xl" variant="transparent">
              <Image
                src={
                  in_wishlist
                    ? "/imgs/heart_filled.svg"
                    : "/imgs/heart_outlined.svg"
                }
                alt={"favourite"}
              />
            </ActionIcon>
          </Group>
          <TypographyStylesProvider my={30} className={classes.secondary_color}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TypographyStylesProvider>
          <Grid mb="xl" gutter="lg">
            <Grid.Col span={6}>
              <Group position="apart">
                <Text size="lg" color="dimmed">
                  Type Car
                </Text>
                <Text size="lg" className={classes.secondary_color}>
                  {car_type}
                </Text>
              </Group>
            </Grid.Col>
            {Object.entries(specs).map((spec, i) => (
              <Grid.Col key={i} span={6}>
                <Group position="apart">
                  <Text size="lg" color="dimmed" transform="capitalize">
                    {spec[0]}
                  </Text>
                  <Text size="lg" className={classes.secondary_color}>
                    {spec[1]}
                  </Text>
                </Group>
              </Grid.Col>
            ))}
          </Grid>
          <Group position="apart" align="center" mt={50}>
            <Box>
              <Group noWrap spacing={5}>
                <Title order={2}>${price} /</Title>
                <Text
                  color="dimmed"
                  size="sm"
                  className={classes.secondary_color}
                  weight={600}
                >
                  day
                </Text>
              </Group>
              {discount && (
                <Text size="sm" strikethrough weight={600} color="dimmed">
                  {discount}
                </Text>
              )}
            </Box>
            <Link href={"/rent/" + slug} passHref>
              <Button size="lg" component="a">
                Rent Now
              </Button>
            </Link>
          </Group>
        </MyCard>
      </Grid.Col>
    </Grid>
  );
};
export default CarDetail;
