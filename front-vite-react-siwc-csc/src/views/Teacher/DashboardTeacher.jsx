import { Box, Grid, Paper } from "@mui/material";
import { useTheme as theme } from "@mui/material/styles";
import { lazy } from "react";
import { Outlet } from "react-router-dom";

const CopyRight = lazy(() => import("../../components/copy right/CopyRight"));
const AppBar = lazy(() => import("../../components/teacher/AppBar/AppBar"));
const Drawer = lazy(() => import("../../components/teacher/Drawer/Drawer"));

const DashboardTeacher = () => {
  const tGreen100 = theme().palette.tertiary.tGreen50["main"];
  return (
    <Box
      direction="column"
      sx={{
        display: "flex",
        height: "100vh",
        pt: 8,
      }}
    >
      <AppBar />
      <Drawer />
      <Grid
        container
        sx={{
          flexGrow: 1,
          pt: { xs: 2.5, sm: 4 },
          px: { xs: 1.5, sm: 2, md: 4, lg: 4.3, xl: 6 },
          width: "100%",
        }}
      >
        <Grid
          container
          component={Paper}
          bgcolor={tGreen100}
          elevation={24}
          square
        >
          <Outlet />
        </Grid>
        <Grid
          container
          mt={3}
          mb={2}
          component={Box}
          justifyContent="center"
          alignItems="center"
        >
          <CopyRight
            variant="body2"
            color="text.secondary"
            textAlign={"center"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardTeacher;
