import {
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Card as CardMui,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTeacherContext } from "../../../../context/Teacher/TeacherProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad";
import useWindowSize from "../../../../hooks/useWindowSize";
import { getByIdDegree } from "../../../../services/degrees/DegreesService";

const cardMuiStyle = () => {
  const windowSize = useWindowSize();
  const { open } = useTeacherContext();
  return !open
    ? {
        width:
          windowSize.width >= "0" && windowSize.width <= "899"
            ? "100%"
            : windowSize.width >= "900" && windowSize.width <= "920"
            ? "20rem"
            : windowSize.width >= "921" && windowSize.width <= "955"
            ? "21rem"
            : windowSize.width >= "956" && windowSize.width <= "999"
            ? "22rem"
            : windowSize.width >= "1000" && windowSize.width <= "1050"
            ? "23.7rem"
            : windowSize.width >= "1051" && windowSize.width <= "1100"
            ? "25rem"
            : windowSize.width >= "1101" && windowSize.width <= "1150"
            ? "26.5rem"
            : windowSize.width >= "1151" && windowSize.width <= "1200"
            ? "28rem"
            : windowSize.width >= "1201" && windowSize.width <= "1250"
            ? "29.8rem"
            : windowSize.width >= "1251" && windowSize.width <= "1300"
            ? "31rem"
            : windowSize.width >= "1301" && windowSize.width <= "1350"
            ? "33rem"
            : windowSize.width >= "1351" && windowSize.width <= "1400"
            ? "22.5rem"
            : windowSize.width >= "1401" && windowSize.width <= "1450"
            ? "23.5rem"
            : windowSize.width >= "1451" && windowSize.width <= "1500"
            ? "24.5rem"
            : windowSize.width >= "1501" && windowSize.width <= "1550"
            ? "25.5rem"
            : windowSize.width >= "1551" && windowSize.width <= "1600"
            ? "26.2rem"
            : windowSize.width >= "1601" && windowSize.width <= "1650"
            ? "27.2rem"
            : "28rem",
      }
    : {
        width:
          windowSize.width >= "900" && windowSize.width <= "920"
            ? "29rem"
            : windowSize.width >= "921" && windowSize.width <= "955"
            ? "32rem"
            : windowSize.width >= "956" && windowSize.width <= "999"
            ? "33rem"
            : windowSize.width >= "1000" && windowSize.width <= "1050"
            ? "36rem"
            : windowSize.width >= "1051" && windowSize.width <= "1100"
            ? "38.8rem"
            : windowSize.width >= "1101" && windowSize.width <= "1150"
            ? "42rem"
            : windowSize.width >= "1151" && windowSize.width <= "1200"
            ? "21.5rem"
            : windowSize.width >= "1201" && windowSize.width <= "1250"
            ? "22.5rem"
            : windowSize.width >= "1251" && windowSize.width <= "1300"
            ? "24.5rem"
            : windowSize.width >= "1301" && windowSize.width <= "1350"
            ? "25.7rem"
            : windowSize.width >= "1351" && windowSize.width <= "1400"
            ? "27.5rem"
            : windowSize.width >= "1401" && windowSize.width <= "1450"
            ? "29.5rem"
            : windowSize.width >= "1451" && windowSize.width <= "1500"
            ? "19.5rem"
            : windowSize.width >= "1501" && windowSize.width <= "1550"
            ? "20.5rem"
            : windowSize.width >= "1551" && windowSize.width <= "1600"
            ? "21.2rem"
            : windowSize.width >= "1601" && windowSize.width <= "1650"
            ? "22.2rem"
            : "23.5rem",
      };
};

const Card = ({ degreeSubject }) => {
  const { handleChangeOpenModal, handleChangeModalData } = useTeacherContext();

  const { loading, callEndPoint } = useFetchAndLoad();

  const getApiDegreeById = async (idDegree, jwt, bearer) =>
    await callEndPoint(getByIdDegree(idDegree, jwt, bearer));

  const ssessionState = useSelector((store) => store.ssession);

  const { jwt, bearer } = ssessionState;

  const [degree, setDegree] = useState({});

  useEffect(() => {
    getApiDegreeById(degreeSubject.idDegree, jwt, bearer)
      .then(({ data }) => {
        delete data.degreeSubjectEntitys;
        delete data.studentEntitys;
        setDegree(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [degreeSubject.idDegree, jwt, bearer]);

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
      {/* <pre>{JSON.stringify(degreeSubject, null, 1)}</pre> */}
      <CardMui sx={cardMuiStyle} elevation={18} square>
        <CardActionArea
          onClick={() => {
            handleChangeOpenModal();
            handleChangeModalData("degree", degree);
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" height={250} animation="wave" />
          ) : (
            <CardMedia
              component="img"
              height="250"
              image="https://picsum.photos/250"
              alt={degree.nameDegree}
              sx={{ objectFit: "cover" }}
            />
          )}
          {loading ? (
            <Skeleton
              variant="rectangular"
              sx={{ mt: 0.2, ...cardMuiStyle }}
              height={40}
              animation="wave"
            />
          ) : (
            <CardHeader
              style={{
                textAlign: "center",
                padding: "10px",
              }}
              sx={{ mt: 0.2, mb: 0.5, boxShadow: 4, bgcolor: "gray.300" }}
              title={
                <Typography
                  variant="subtitle4"
                  fontWeight={700}
                  letterSpacing="0.25rem"
                >
                  {degree.nameDegree}
                </Typography>
              }
            />
          )}
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={200}
              height={40}
              animation="wave"
            />
          ) : (
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                handleChangeOpenModal();
                handleChangeModalData("degree", degree);
              }}
            >
              SHOW STUDENTS
            </Button>
          )}
        </CardActions>
      </CardMui>
    </Grid>
  );
};

export default Card;
