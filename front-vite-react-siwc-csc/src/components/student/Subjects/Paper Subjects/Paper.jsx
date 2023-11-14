import { Grid, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Cards from "../Cards Subjects/Cards";

const Paper = () => {
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange["300"];

  return (
    <Grid
      container
      component={MuiPaper}
      elevation={10}
      sx={{
        backgroundColor: sDeepOrange["light"]["value"],
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
      }}
    >
      <Cards />
    </Grid>
  );
};

export default Paper;
