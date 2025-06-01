import { Box, Group } from "@mantine/core";
import MyComp from "containers/MyComp";
import MyFooter from "layouts/MyFooter";
import MyHeader from "layouts/MyHeader";
import React, { useState } from "react";
import useGlobalStyles from "styles/useGlobalStyles";
import DashboardPanel from "./DashboardPanel";

type Props = { children: React.ReactNode };

const DashboardWrapper = ({ children }: Props) => {
  const { classes } = useGlobalStyles();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MyHeader sticky opened={opened} toggleOpen={setOpened} />
      <Box className={classes.bgCover}>
        <MyComp p={0}>
          <Group spacing={0} align="stretch" noWrap>
            <DashboardPanel opened={opened} toggleOpen={setOpened} />
            <Box p="xl" className={classes.bgBody} style={{ width: "100%" }}>
              {children}
            </Box>
          </Group>
        </MyComp>
      </Box>
      <MyFooter />
    </>
  );
};

export default DashboardWrapper;
