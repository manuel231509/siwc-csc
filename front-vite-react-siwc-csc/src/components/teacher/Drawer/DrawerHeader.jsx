import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Image } from "mui-image";
import shield_csc_image_without_background from "../../../assets/images/shield_csc_image_without_background.png";
import { useTeacherContext } from "../../../context/Teacher/TeacherProvider";
import { IconButtonStyled } from "../Students/Modal/ModalStyled/ModalStyled";

const DrawerHeaderMui = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const DrawerHeader = () => {
  const theme = useTheme();
  const { open, handleDrawerClose } = useTeacherContext();

  return (
    <DrawerHeaderMui>
      <Grid
        container
        flex
        direction="row"
        alignItems="center"
        sx={{ flexGrow: 1 }}
      >
        <Grid item xs={10.5}>
          {open && (
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                {open && (
                  <Image
                    src={shield_csc_image_without_background}
                    alt={"shield_csc"}
                    width={105}
                    height={"auto"}
                    fit={"cover"}
                    duration={1000}
                    easing={"ease-in-out"}
                    showLoading={true}
                    errorIcon={true}
                    shift={"top"}
                    distance={"100pX"}
                    shiftDuration={500}
                  />
                )}
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
          )}
        </Grid>
        <Grid item xs={1.5} container justifyContent="end">
          <IconButtonStyled
            onClick={handleDrawerClose}
            shades={"main"}
            color={"inherit"}
          >
            {theme.direction !== "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButtonStyled>
        </Grid>
      </Grid>
    </DrawerHeaderMui>
  );
};
export default DrawerHeader;
