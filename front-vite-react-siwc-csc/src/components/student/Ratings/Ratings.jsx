import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { getByIdDegree } from "../../../services/degrees/DegreesService";
import { useEffect } from "react";
import FormRatings from "./Form Ratings/FormRatings";
import PaperRatings from "./Paper Ratings/PaperRatings";

const Ratings = () => {
  const theme = useTheme();
  const tGreen50 = theme.palette.tertiary.tGreen50;
  const pTeal800 = theme.palette.primary.pTeal800;

  const ssessionState = useSelector((store) => store.ssession);

  const [degree, setDegree] = useState({});

  const { loading, callEndPoint } = useFetchAndLoad();

  const getApiIdDegree = async (idDegree, jwt, bearer) =>
    await callEndPoint(getByIdDegree(idDegree, jwt, bearer));

  const { session, jwt, bearer } = ssessionState;

  useEffect(() => {
    console.log("session: ", session);
    getApiIdDegree(session.student.idDegree, jwt, bearer)
      .then(({ data }) => {
        setDegree(data);
      })
      .catch(({ error }) => console.log("error:  ", error));
  }, [ssessionState]);

  return (
    <Grid container justifyContent="center" component={Box} bgcolor="inherit">
      <Grid
        item
        xs={11}
        m={2}
        mt={5}
        mb={1}
        container
        justifyContent="center"
        alignContent="center"
      >
        <Typography
          variant="h5"
          color={tGreen50["contrastTextLight"]}
          fontWeight={800}
          letterSpacing=".75rem"
        >
          RATINGS
          <Divider color="gray" />
        </Typography>
      </Grid>
      <Grid container>
        <Grid
          container
          mt={5}
          mb={1.5}
          p={2}
          pl={5}
          pr={5}
          justifyContent="center"
          alignContent="center"
          width="auto"
          bgcolor={pTeal800["light"]}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            letterSpacing={".17rem"}
          >
            {!loading ? (
              degree.nameDegree
            ) : (
              <Skeleton
                variant="rounded"
                animation="wave"
                width={120}
                height={35}
              />
            )}
          </Typography>
        </Grid>
        <Grid container mt={1} mb={1} justifyContent={"center"}>
          <Grid item xs={11.8} alignContent={"center"} alignSelf={"center"}>
            <FormRatings />
            <PaperRatings />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Ratings;
