import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { lazy } from "react";
import { useSelector } from "react-redux";
import Accordion from "./Accordion/Accordion";

const Modal = lazy(() => import("../Modal/Modal"));

const AccordionsStudent = () => {
  const ssessionState = useSelector((store) => store.ssession);
  const [teacher, setTeacher] = useState({
    subjectEntitys: [],
  });
  useEffect(() => {
    setTeacher(ssessionState.session.teacher);
  }, [ssessionState.session.teacher]);

  return (
    <Grid container p={1}>
      {teacher.subjectEntitys.map((subject) => (
        <Accordion key={subject.idSubject} subject={subject} />
      ))}
      <Modal />
    </Grid>
  );
};

export default AccordionsStudent;
