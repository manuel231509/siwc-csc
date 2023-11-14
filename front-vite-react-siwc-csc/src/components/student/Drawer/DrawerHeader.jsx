import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "@mui/icons-material";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "mui-image";
import React from "react";
import shield_csc_image_without_background from "../../../assets/images/shield_csc_image_without_background.png";
import { useStudentContext } from "../../../context/Student/StudentProvider";

const DrawerHeaderMui = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 1),
}));

const DrawerHeader = () => {
  const theme = useTheme();
  const { open, handleDrawerClose } = useStudentContext();

  return (
    <DrawerHeaderMui>
      <Grid
        container
        flex
        direction={"row"}
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        <Grid item xs={10.5}>
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            sx={{ ...(!open && { display: "none" }) }}
          >
            <Grid item>
              <Image src={shield_csc_image_without_background} width={80} />
            </Grid>
            <Grid container justifyContent="center">
              <Typography
                variant="subtitle3"
                justifyContent={"center"}
                textAlign="center"
                style={{ display: "inline-block", whiteSpace: "pre-line" }}
                sx={{
                  mt: 1.5,
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  textDecoration: "none",
                }}
              >
                WEB INFORMATION
                <br />
                SYSTEM OF RATINGS
              </Typography>
              <Typography
                variant="subtitle3"
                justifyContent={"center"}
                textAlign="center"
                style={{ display: "inline-block", whiteSpace: "pre-line" }}
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  textDecoration: "none",
                }}
              >
                <Divider
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.primary["contrastTextLight"],
                    mb: 0.5,
                    mt: 0.5,
                  }}
                />
                SANTA CECILIA SCHOOL
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1.5}>
          <IconButton onClick={handleDrawerClose} color="inherit">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </DrawerHeaderMui>
  );
};

export default DrawerHeader;
