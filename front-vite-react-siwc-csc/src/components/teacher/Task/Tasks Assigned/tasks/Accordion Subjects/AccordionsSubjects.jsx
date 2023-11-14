import { Grid } from "@mui/material";
import { useTasksAssignedContext } from "../../../../../../context/Tasks/TasksProvider";
import FormGrades from "../Form Grades/FormGrades";
import Accordion from "./Accordion/Accordion";
import ModalAddTask from "../Add Task/Modal Add Task/ModalAddTask";
import ModalDeliveredTask from "../../task/Task Details/Accordion Details/Modal Delivered Task/ModalDeliveredTask";
const AccordionsSubjects = () => {
  const { subjects, loading } = useTasksAssignedContext();
  return (
    <>
      <FormGrades />
      <Grid container p={1}>
        {!loading.subjects &&
          subjects.map((subject) => (
            <Accordion key={subject.idSubject} subject={subject} />
          ))}
      </Grid>
      <ModalAddTask />
      <ModalDeliveredTask />
    </>
  );
};
export default AccordionsSubjects;
