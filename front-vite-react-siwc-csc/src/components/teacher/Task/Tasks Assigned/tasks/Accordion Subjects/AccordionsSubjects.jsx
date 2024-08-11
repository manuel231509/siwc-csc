import { Grid } from "@mui/material";
import { lazy, useEffect } from "react";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import { SuspenseProgress } from "../../../../../SuspenseProgress/SusProg";
import ModalAddTask from "../Add Task/Modal Add Task/ModalAddTask";
import ModalDeliveredTask from "../../task/Task Details/Accordion Details/Modal Delivered Task/ModalDeliveredTask";

const Accordion = lazy(() => import("./Accordion/Accordion"));

const AccordionsSubjects = () => {
  const { subjects, loading, openModalAddTask, openModalDeliveredTask } =
    useTasksAssignedContext();
  useEffect(() => {
    console.log(
      "INICIO AccordionsSubjects ===================================="
    );
    console.log("AccordionsSubjects ");
    return () => {
      console.log(
        "==================================== FIN AccordionsSubjects"
      );
    };
  }, []);
  return (
    !loading.gperiods &&
    !loading["gperiodbydatenow"] &&
    !loading.gdegrees &&
    !loading.gsubjects && (
      <Grid container p={1} rowGap={1}>
        <SuspenseProgress>
          {subjects.map((subject) => (
            <Accordion key={subject.idSubject} subject={subject} />
          ))}
        </SuspenseProgress>
        {openModalAddTask && <ModalAddTask />}
        {openModalDeliveredTask && <ModalDeliveredTask />}
      </Grid>
    )
  );
};
export default AccordionsSubjects;
