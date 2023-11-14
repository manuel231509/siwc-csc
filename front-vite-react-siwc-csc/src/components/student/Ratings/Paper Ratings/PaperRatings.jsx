import { Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStudentContext } from "../../../../context/Student/StudentProvider";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad3";
import { getSubjectsByIdNumberStudent } from "../../../../services/subject/SubjectService";
import CollapsibleTable from "./Collapsible Table/CollapsibleTable";

const subjectid = {
  "FIR-PER": 1,
  "SEC-PER": 2,
  "THI-PER": 3,
  "FOU-PER": 4,
};

const PaperRatings = () => {
  const { select, handleChangeStudentObject } = useStudentContext();
  const { loading, callEndPoint } = useFetchAndLoad();

  const {
    jwt,
    bearer,
    session: { student: std },
    ...props
  } = useSelector((store) => store.ssession);

  const getApiSubjectsByIdNumberStudent = async (
    idNumberStudent,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      getSubjectsByIdNumberStudent(idNumberStudent, jwt, bearer),
      "subjectsByIdNumberStudent",
      "localSubjectsByIdNumberStudent"
    );

  useEffect(() => {
    const fetchData = async () => {
      const { data: dataSubjects } = await getApiSubjectsByIdNumberStudent(
        std.idNumberStudent,
        jwt,
        bearer
      );
      const stde = { ...std, subjects: dataSubjects };
      stde.raitingEntitys = std.raitingEntitys.filter(
        (rating) => subjectid[rating.idPeriod] <= subjectid[select.periods]
      );
      console.log("stde -> ", stde);
      handleChangeStudentObject(stde);
    };
    fetchData();
  }, [select.periods]);

  return (
    <Grid
      component={Paper}
      elevation={10}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.secondary.sDeepOrange["300"]["light"]["value"],
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
        p: 1,
      }}
    >
      <CollapsibleTable />
    </Grid>
  );
};

export default PaperRatings;
