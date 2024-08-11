import {
  CardContent,
  CardHeader,
  Card as CardMui,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MainAchievements from "../List Achievements/Main Achievements/MainAchievements";
import AddAchievements from "../Add Achievements/AddAchievements";

const PaperAchievements = () => {
  return (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.secondary.sDeepOrange["300"]["light"]["value"],
        textAlign: "center",
        alignContent: "center",
        m: 1,
        p: 1,
      }}
    >
      <CardMui
        elevation={9}
        square
        sx={{ width: "100%", backgroundColor: "whitesmoke" }}
      >
        <CardHeader
          style={{ textAlign: "center" }}
          title={
            <Typography
              variant="subtitle2"
              fontWeight={700}
              letterSpacing={".17rem"}
            >
              ASSIGNED ACHIEVEMENTS
            </Typography>
          }
        />
        <CardContent>
          <AddAchievements />
          <MainAchievements />
        </CardContent>
      </CardMui>
    </Grid>
  );
};
export default PaperAchievements;
