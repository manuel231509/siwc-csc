import { Close } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";
import { useStudentContext } from "../../../../../../../../context/Student/StudentProvider";
import useWindowSize from "../../../../../../../../hooks/useWindowSize";
import FormDeliverTask from "./Form Deliver Task/FormDeliverTask";
import { IconButtonStyled } from "./Styled/FadeDeliverTaskStyled";

const styleBox = () => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "98vw",
  maxHeight: "98vh",
  border: "2px solid #000",
  boxShadow: 26,
  overflowX: "hidden",
  overflowY: "auto",
});

const FadeDeliverTask = () => {
  const windowSize = useWindowSize();

  const theme = useTheme();

  const { openModalDeliverTask, handleChangeCloseModalDeliverTask, select } =
    useStudentContext();
  return (
    <Fade in={openModalDeliverTask}>
      <Card sx={styleBox(windowSize)}>
        <CardHeader
          style={{ backgroundColor: theme.palette.primary["main"] }}
          action={
            <IconButtonStyled onClick={handleChangeCloseModalDeliverTask}>
              <Close
                sx={{
                  color: theme.palette.primary["contrastTextMain"],
                }}
              />
            </IconButtonStyled>
          }
          title={
            <Grid
              container
              justifyContent="center"
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
                textAlign="center"
                fontWeight={700}
                letterSpacing={".2rem"}
                color={theme.palette.primary["contrastTextMain"]}
                fontSize={{
                  xs: ".7rem",
                  sm: ".9rem",
                  md: "1.1rem",
                }}
              >
                <>DELIVER TASK ({select?.degree?.nameDegree})</>
              </Typography>
              <Typography
                variant="subtitle4"
                fontWeight={700}
                textAlign="center"
                letterSpacing=".2rem"
                color={theme.palette.primary["contrastTextMain"]}
                fontSize={{
                  xs: ".7rem",
                  sm: ".9rem",
                  md: "1.1rem",
                }}
              >
                {select.subjects?.nameSubject?.toLocaleUpperCase()}
              </Typography>
              <Typography
                variant="subtitle4"
                fontWeight={700}
                textAlign="center"
                letterSpacing=".2rem"
                color={theme.palette.primary["contrastTextMain"]}
                fontSize={{
                  xs: ".7rem",
                  sm: ".9rem",
                  md: "1.1rem",
                }}
              >
                {select.task?.taskName?.toLocaleUpperCase()}
              </Typography>
            </Grid>
          }
        />
        <CardContent>
          <FormDeliverTask />
        </CardContent>
      </Card>
    </Fade>
  );
};

export default forwardRef(FadeDeliverTask);
