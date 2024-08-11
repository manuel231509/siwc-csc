import { Close as CloseIcon } from "@mui/icons-material";
import { Fade, Grid, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { useTeacherContext } from "../../../../../../context/Teacher/TeacherProvider";
import { IconButtonCloseStyled } from "../../../../Task/Tasks Assigned/task/Task Details/Accordion Details/Modal Delivered Task/Fade Delivered Task/Styled/CardHeaderStyled";
import { BoxStyled } from "./Styled/FadeAddAchievements";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import FormAddAchievements from "./Form Add Achievements/FormAddAchievements";

const FadeAddAchievements = () => {
  const theme = useTheme();
  const { height } = useWindowSize();
  const {
    openModalAddAchievements,
    select,
    loading,
    handleChangeCloseModalAddAchievements,
  } = useTeacherContext();
  return (
    <Fade in={openModalAddAchievements}>
      <BoxStyled>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            flexGrow: 1,
            p: 0.9,
            width: { xs: "89.4vw", sm: "89.9vw", md: "85.7vw", lg: "79.8vw" },
            borderBottom: "2.9px solid #000000",
            boxShadow: 10,
          }}
          bgcolor={(theme) => theme.palette.primary["main"]}
        >
          <Grid item xs sx={{ flexGrow: 1 }}>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeate(2,1fr)",
                gap: 1,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h5"
                component={"h4"}
                textAlign={"center"}
                fontWeight={700}
                letterSpacing={".2rem"}
                color={(theme) => theme.palette.primary["contrastTextMain"]}
                fontSize={{ xs: ".7rem", sm: ".9rem", md: "1.1rem" }}
              >
                {!loading["achievements_degrees_g"] ? (
                  `ADD ACHIEVEMENTS (${select?.nameDegrees})`
                ) : (
                  <Skeleton width={"200px"} height={"30px"} animation="wave" />
                )}
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component={"h4"}
                textAlign={"center"}
                fontWeight={700}
                letterSpacing={".2rem"}
                color={(theme) => theme.palette.primary["contrastTextMain"]}
                fontSize={{ xs: ".7rem", sm: ".9rem", md: "1.1rem" }}
              >
                {!loading["achievements_subjects_g"] ? (
                  select?.nameSubjects
                ) : (
                  <Skeleton width={"200px"} height={"30px"} animation="wave" />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={0.7} container justifyContent={"end"}>
            <IconButtonCloseStyled
              onClick={handleChangeCloseModalAddAchievements}
            >
              {theme.direction !== "rtl" && <CloseIcon />}
            </IconButtonCloseStyled>
          </Grid>
        </Grid>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            flexGrow: 1,
            p: 1.7,
            width: { xs: "89.4vw", sm: "89.6vw", md: "auto", lg: "79.8vw" },
            ...(height > 0 && height < 400 && { height: "65vh" }),
            ...(height > 400 && height <= 600 && { height: "75vh" }),
            borderBottom: "2.9px solid #000000",
            boxShadow: 10,
            maxWidth: "98vw",
            maxHeight: "83vh",
            overflowY: "auto",
          }}
          bgcolor="background.paper"
        >
          <FormAddAchievements />
        </Grid>
      </BoxStyled>
    </Fade>
  );
};

export default forwardRef(FadeAddAchievements);
