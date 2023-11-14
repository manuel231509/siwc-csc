import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Card as MuiCard,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useStudentContext } from "../../../../context/Student/StudentProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad2";
import useWindowSize from "../../../../hooks/useWindowSize";
import { getByIdNumberTeacher } from "../../../../services/teacher/TeacherService";
import TaskCard from "../Task/TaskCard";
import { encryptedText } from "../../../../CryptoJs/CryptoJs";
import { saveLocalStorage } from "../../../../LocalStorage/LocalStorage";

const ButtonMoreTaskStyled = styled(Button)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.secondary.sDeepOrange["500"]["dark"]["contrastText"],
    backgroundColor:
      theme.palette.secondary.sDeepOrange["500"]["dark"]["value"],
  },
}));

const cardMuiStyle = () => {
  const windowSize = useWindowSize();
  const { open } = useStudentContext();
  return {
    width:
      windowSize.width >= "0" && windowSize.width <= "899"
        ? "100%"
        : windowSize.width >= "900" && windowSize.width <= "920"
        ? !open
          ? "21rem"
          : "29rem"
        : windowSize.width >= "921" && windowSize.width <= "955"
        ? !open
          ? "22.7rem"
          : "32rem"
        : windowSize.width >= "956" && windowSize.width <= "999"
        ? !open
          ? "23.4rem"
          : "33rem"
        : windowSize.width >= "1000" && windowSize.width <= "1050"
        ? !open
          ? "24.7rem"
          : "36rem"
        : windowSize.width >= "1051" && windowSize.width <= "1100"
        ? !open
          ? "26rem"
          : "38.8rem"
        : windowSize.width >= "1101" && windowSize.width <= "1150"
        ? !open
          ? "27.8rem"
          : "42rem"
        : windowSize.width >= "1151" && windowSize.width <= "1200"
        ? !open
          ? "28rem"
          : "22.8rem"
        : windowSize.width >= "1201" && windowSize.width <= "1250"
        ? !open
          ? "29.8rem"
          : "23.5rem"
        : windowSize.width >= "1251" && windowSize.width <= "1300"
        ? !open
          ? "31rem"
          : "24.5rem"
        : windowSize.width >= "1301" && windowSize.width <= "1350"
        ? !open
          ? "33.5rem"
          : "25.9rem"
        : windowSize.width >= "1351" && windowSize.width <= "1400"
        ? !open
          ? "23.5rem"
          : "27.5rem"
        : windowSize.width >= "1401" && windowSize.width <= "1450"
        ? !open
          ? "23.5rem"
          : "29.5rem"
        : windowSize.width >= "1451" && windowSize.width <= "1500"
        ? !open
          ? "24.5rem"
          : "19.5rem"
        : windowSize.width >= "1501" && windowSize.width <= "1550"
        ? !open
          ? "25.5rem"
          : "20.5rem"
        : windowSize.width >= "1551" && windowSize.width <= "1600"
        ? !open
          ? "26.2rem"
          : "21.2rem"
        : windowSize.width >= "1601" && windowSize.width <= "1650"
        ? !open
          ? "27.2rem"
          : "22.2rem"
        : !open
        ? "28rem"
        : "23.5rem",
  };
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Card = ({ subject }) => {
  const theme = useTheme();
  const { jwt, bearer } = useSelector((store) => store.ssession);

  const { tasks, select, handleChangeSelect1 } = useStudentContext();

  const { loading, callEndPoint } = useFetchAndLoad();

  const getApiByIdNumberTeacher = async (idNumberTeacher, jwt, bearer) =>
    await callEndPoint(
      getByIdNumberTeacher(idNumberTeacher, jwt, bearer),
      "teacher",
      `teacher_${subject.idSubject}`
    );

  const [teacher, setTeacher] = useState({});

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getApiByIdNumberTeacher(subject.idNumberTeacher, jwt, bearer)
      .then(({ data }) => {
        setTeacher(data);
      })
      .catch((error) => console.log(error));
  }, [subject.idNumberTeacher, jwt, bearer]);

  return (
    <Grid
      item
      sx={{
        width: {
          xs: "100%",
          sm: "95%",
          md: "auto",
          lg: "auto",
          xl: "auto",
        },
      }}
    >
      <MuiCard sx={cardMuiStyle} elevation={18} square>
        <CardMedia
          component="img"
          height="250"
          image={subject.urlImage}
          sx={{
            objectFit: "cover",
          }}
          alt="green iguana"
        />
        <CardHeader
          style={{ textAlign: "center", padding: "10px" }}
          title={
            <Typography
              variant="subtitle4"
              fontWeight={700}
              letterSpacing="0.25rem"
            >
              {subject.nameSubject}
            </Typography>
          }
        />
        <CardContent
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            justifyContent: "center",
          }}
        >
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="body2" fontWeight={600} letterSpacing="0.15rem">
            TEACHER
          </Typography>
          {!loading[`teacher_${subject.idSubject}`] ? (
            <Typography
              variant="subtitle2"
              fontWeight={400}
              letterSpacing="0.15rem"
            >
              {teacher.fullNamesTeacher?.toLocaleUpperCase()}{" "}
              {teacher.fullSurNamesTeacher?.toLocaleUpperCase()}
            </Typography>
          ) : (
            <Typography
              component="div"
              variant="subtitle2"
              fontWeight={400}
              letterSpacing="0.15rem"
            >
              <Skeleton animation="wave" height="40px" />
            </Typography>
          )}
          <Divider sx={{ marginTop: 2, mb: 0.2 }} />
        </CardContent>
        <CardActions
          disableSpacing
          sx={
            expanded
              ? {
                  pt: "5px",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary["contrastTextMain"],
                  boxShadow: theme.shadows[2],
                }
              : {
                  "&:hover": {
                    backgroundColor:
                      theme.palette.primary["pTeal"]["800"]["main"]["value"],
                    color:
                      theme.palette.primary["pTeal"]["800"]["main"][
                        "contrastText"
                      ],
                    boxShadow: theme.shadows[6],
                  },
                }
          }
        >
          <Grid
            container
            justifyContent={"center"}
            onClick={handleExpandClick}
            sx={{ cursor: "pointer" }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              letterSpacing="0.15rem"
            >
              RECENT TASKS
            </Typography>
          </Grid>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              color: theme.palette.primary["contrastTextMain"],
            }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse
          in={expanded}
          timeout={"auto"}
          sx={{
            p: 0,
            m: 0,
          }}
          unmountOnExit
        >
          <Grid item>
            <TaskCard subject={subject} />
            {tasks["value"][`${subject.idSubject}`]?.length > 0 && (
              <CardActions>
                <Grid container>
                  <Grid item xs container justifyContent={"center"}>
                    <ButtonMoreTaskStyled
                      component={NavLink}
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        const selectFormSubjects = {
                          idSubject: encryptedText(subject.idSubject),
                          nameSubject: encryptedText(subject.nameSubject),
                          idNumberTeacher: encryptedText(
                            String(subject.idNumberTeacher)
                          ),
                        };
                        saveLocalStorage("formsubject", selectFormSubjects);
                      }}
                      to="../list/tasks"
                    >
                      SEE MORE TASKS
                    </ButtonMoreTaskStyled>
                  </Grid>
                </Grid>
              </CardActions>
            )}
          </Grid>
        </Collapse>
      </MuiCard>
    </Grid>
  );
};

export default Card;
