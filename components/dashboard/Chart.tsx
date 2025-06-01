import {
  Box,
  Center,
  ColorSwatch,
  Group,
  RingProgress,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import useGlobalStyles from "styles/useGlobalStyles";

type Props = {};

const data = [
  { label: "Sport Car", value: 17.439 },
  { label: "SUV", value: 9.478 },
  { label: "Coupe", value: 18.197 },
  { label: "Hatchback", value: 12.51 },
  { label: "MPV", value: 14.406 },
];

const Chart = (props: Props) => {
  const theme = useMantineTheme();
  const { classes } = useGlobalStyles();

  return (
    <Group position="center" align="center" spacing="lg">
      <RingProgress
        size={260}
        thickness={22}
        roundCaps
        label={
          <Box>
            <Text size={28} weight="bold" align="center">
              72,030
            </Text>
            <Text size="xs" align="center" color="dimmed">
              Rental Cars
            </Text>
          </Box>
        }
        sections={data.map(({ value }, i) => ({
          color: theme.colors.blue[9 - i * 1],
          value,
        }))}
      />
      <Stack sx={{ flex: 1 }}>
        {data.map((item, i) => (
          <Group key={i} position="apart" align="center" noWrap spacing="lg">
            <Group align="center" noWrap>
              <ColorSwatch size={12} color={theme.colors.blue[9 - i * 1]} />
              <Text size="md" weight={600} className={classes.secondary_color}>
                {item.label}
              </Text>
            </Group>
            <Text size="sm" weight={500}>
              {item.value}
            </Text>
          </Group>
        ))}
      </Stack>
    </Group>
  );
};

export default Chart;
