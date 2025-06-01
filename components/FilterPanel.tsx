import React from "react";
import {
  Box,
  Checkbox,
  Group,
  RangeSlider,
  Select,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import useStyles from "styles/useGlobalStyles";
import MyNavbar from "layouts/MyNavbar";
import { SidebarToggleType } from "types/default.dt";
import { CarFilterTypes, FilterSortType } from "types/car.dto";
import { useRouter } from "next/router";

const sorts: FilterSortType[] = ["popular", "new", "asc", "desc"];

interface Props {
  filters: CarFilterTypes;
  dataExist: boolean;
  applyFilter: (val: any, type: string) => void;
}

const FilterPanel = ({
  opened,
  toggleOpen,
  filters,
  dataExist,
  applyFilter,
}: SidebarToggleType & Props) => {
  const router = useRouter();
  const { query } = router;
  const { classes } = useStyles();

  return (
    <MyNavbar sticky opened={opened} toggleOpen={toggleOpen}>
      <Stack spacing={40}>
        {/* sort */}
        <Section title="sort" dataExist={dataExist}>
          <Select
            radius="md"
            searchable
            nothingFound="No options"
            placeholder="Sort by..."
            mt="lg"
            onChange={(val) => applyFilter(val, "sort")}
            defaultValue={sorts.find((s) => s === query?.sort) || "popular"}
            data={sorts.map((sort) => ({
              value: sort,
              label:
                String(sort)[0].toLocaleUpperCase() + String(sort).substring(1),
            }))}
          />
        </Section>

        {/* type */}
        <Section title="type" dataExist={dataExist}>
          <Stack spacing="xl" mt="lg">
            {filters?.type?.map((d, i) => (
              <Checkbox
                key={i}
                radius={6}
                size="sm"
                checked={d.selected}
                onChange={() =>
                  applyFilter(
                    {
                      val: d.label.replaceAll(" ", "-"),
                      insert: !d.selected,
                    },
                    "type",
                  )
                }
                label={
                  <Group spacing={5}>
                    <Text className={classes.secondary_color} size="md">
                      {d.label}
                    </Text>
                    <Text size="md" color="dimmed">
                      ({d.total})
                    </Text>
                  </Group>
                }
              />
            ))}
          </Stack>
        </Section>

        {/* capacity */}
        <Section title="capacity" dataExist={dataExist}>
          <Stack spacing="xl" mt="lg">
            {filters?.capacity?.map((d, ind) => (
              <Checkbox
                radius={6}
                size="sm"
                key={ind}
                checked={d.selected}
                onChange={() =>
                  applyFilter({ val: d.label, insert: !d.selected }, "capacity")
                }
                label={
                  <Text className={classes.secondary_color} size="md">
                    {d.label}
                  </Text>
                }
              />
            ))}
          </Stack>
        </Section>

        {/* price */}
        <Section title="price" dataExist={dataExist}>
          <RangeSlider
            onChangeEnd={(e) => applyFilter(e, "price")}
            mt="lg"
            min={filters?.price?.min}
            max={filters?.price?.max}
            defaultValue={[
              filters?.price?.selected_min,
              filters?.price?.selected_max,
            ]}
            styles={(theme) => ({
              track: { height: 12 },
              thumb: {
                background: theme.colors.blue,
                width: 24,
                height: 24,
                borderColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
                boxShadow: "none",
              },
            })}
          />
        </Section>
      </Stack>
    </MyNavbar>
  );
};
const Section = ({
  title,
  children,
  dataExist,
}: {
  title: string;
  children: React.ReactNode;
  dataExist: boolean;
}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const hasFilter = title === "price" ? query.min || query.max : query[title];

  const clearAFilter = () => {
    if (title === "price") {
      delete query.min;
      delete query.max;
    } else {
      delete query[title];
    }
    router.push({
      pathname,
      query,
    });
  };

  return (
    <Box>
      <Group position="apart" align="center">
        <Text color="dimmed" size="xs" transform="uppercase">
          {title}
        </Text>
        {hasFilter && (
          <UnstyledButton onClick={clearAFilter}>
            <Text color="dimmed" size="xs" underline>
              clear
            </Text>
          </UnstyledButton>
        )}
      </Group>
      {dataExist ? (
        children
      ) : (
        <Skeleton
          height={30}
          mt={5}
          radius="sm"
          animate={false}
          style={{ opacity: 0.4 }}
        />
      )}
    </Box>
  );
};
export default FilterPanel;
