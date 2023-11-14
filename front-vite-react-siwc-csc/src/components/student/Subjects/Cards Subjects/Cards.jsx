import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad2";
import { getSubjectsIdDegreeStudent } from "../../../../services/subject/SubjectService";
import Card from "../Card Subject/Card";
import { useStudentContext } from "../../../../context/Student/StudentProvider";

const Cards = () => {
  const { loading, subjects, handleChangeSubjects } = useStudentContext();

  const { callEndPoint } = useFetchAndLoad();

  const getApiSubjectsByIdDegreeStudent = async (idDegree, jwt, bearer) =>
    await callEndPoint(
      getSubjectsIdDegreeStudent(idDegree, jwt, bearer),
      "subjects"
    );

  const { session, jwt, bearer } = useSelector((store) => store.ssession);
  const { student } = session;

  useEffect(() => {
    getApiSubjectsByIdDegreeStudent(student.idDegree, jwt, bearer)
      .then(({ data }) => {
        handleChangeSubjects(data);
      })
      .catch((error) => console.log("error: ", error));
  }, [student.idDegree, jwt, bearer]);

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={12} pt={3} pb={2}>
        <Grid
          container
          justifyContent="center"
          spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
        >
          {!loading["subjects"] ? (
            subjects.map((subject, index) => (
              <Card key={index} subject={subject} />
            ))
          ) : (
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
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
