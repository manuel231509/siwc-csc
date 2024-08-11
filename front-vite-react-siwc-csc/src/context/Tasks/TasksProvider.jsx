import { createContext, useContext, useState } from "react";

const TasksAssignedContext = createContext({});

const TasksAssignedProvider = ({ children }) => {
  const [expandedAccordionSubjects, setExpandedAccordionSubjects] =
    useState(false);

  const handleChangeExpandedAccordionSubjects =
    (panel) => (event, isExpanded) => {
      setExpandedAccordionSubjects(isExpanded ? panel : false);
    };
  const handleChangeExpandedAccordionSubjects1 = (panel) => {
    setExpandedAccordionSubjects(panel);
  };
  const [expandedAccordionTaskDetails, setExpandedAccordionTaskDetails] =
    useState(false);

  const handleChangeExpandedAccordionTaskDetails =
    (panel) => (event, isExpanded) => {
      setExpandedAccordionTaskDetails(isExpanded ? panel : false);
    };

  const [
    expandedAccordionDeliveredTaskDetails,
    setExpandedAccordionDeliveredTaskDetails,
  ] = useState(false);

  const handleChangeExpandedAccordionDeliveredTask =
    (panel) => (event, isExpanded) => {
      setExpandedAccordionDeliveredTaskDetails(isExpanded ? panel : false);
    };

  const [openModalAddTask, setOpenModalAddTask] = useState(false);

  const handleChangeOpenModalAddTask = () => setOpenModalAddTask(true);

  const handleChangeCloseModalAddTask = () => setOpenModalAddTask(false);

  const [openModalDeliveredTask, setOpenModalDeliveredTask] = useState(false);

  const handleChangeOpenModalDeliveredTask = () =>
    setOpenModalDeliveredTask(true);

  const handleChangeCloseModalDeliveredTask = () =>
    setOpenModalDeliveredTask(false);

  const [subjects, setSubjects] = useState([]);

  const handleChangeSubjects = (value) => {
    setSubjects(value);
  };

  const [loading, setLoading] = useState({});
  const handleChangeLoading = (nameField, value) => {
    setLoading((prev) => ({ ...prev, [nameField]: value }));
  };
  const handleChangeLoadingPrev = (nameField, value) => {
    setLoading((prevLoading) => ({ ...prevLoading, [nameField]: value }));
  };

  const initialPeriodPlans = {
    value: [],
    error: "",
  };

  const [periodsPlans, setPeriodsPlans] = useState(initialPeriodPlans);

  const handleChangePeriodsPlans = (nameField, value) => {
    setPeriodsPlans({ ...periodsPlans, [nameField]: value });
  };
  const handleChangePeriodsPlans1 = (value) => {
    setPeriodsPlans(value);
  };

  const [periods, setPeriods] = useState({
    data: [],
    error: {},
  });

  const handleChangePeriods = (nameField, value) => {
    setPeriods({ ...periods, [nameField]: value });
  };

  const [select, setSelect] = useState({});

  const handleChangeSelect = (nameField, value) => {
    setSelect((prev) => ({ ...prev, [nameField]: value }));
  };

  const handleChangeSelect1 = (value) => {
    setSelect(value);
  };
  const handleChangeSelect2 = (nameField, value) => () => {
    setSelect((prev) => ({ ...prev, [nameField]: value }));
  };

  const [degrees, setDegrees] = useState({
    data: [],
    error: {},
  });

  const handleChangeDegrees = (nameField, value) => {
    setDegrees((prev) => ({ ...prev, [nameField]: value }));
  };

  const [students, setStudents] = useState({
    data: [],
    error: {},
  });

  const handleChangeStudents = (nameField, value) => {
    setStudents((prev) => ({ ...prev, [nameField]: value }));
  };

  const handleChangeStudents1 = (value) => {
    setStudents(value);
  };
  const handleChangeStudents2 = (value) => {
    setStudents((prev) => ({ ...prev, ...value }));
  };

  const [tasks, setTasks] = useState({
    data: [],
    error: {},
  });

  const handleChangeTasks = (nameField, value) => {
    setTasks((prev) => ({ ...prev, [nameField]: value }));
  };

  const handleChangeTasks1 = (value) => {
    setTasks(value);
  };
  const handleChangeTasks2 = (value) => {
    setTasks((prev) => ({ ...prev, ...value }));
  };

  const value = {
    expandedAccordionSubjects,
    handleChangeExpandedAccordionSubjects,
    handleChangeExpandedAccordionSubjects1,
    expandedAccordionTaskDetails,
    handleChangeExpandedAccordionTaskDetails,
    expandedAccordionDeliveredTaskDetails,
    handleChangeExpandedAccordionDeliveredTask,
    openModalAddTask,
    handleChangeOpenModalAddTask,
    handleChangeCloseModalAddTask,
    openModalDeliveredTask,
    handleChangeOpenModalDeliveredTask,
    handleChangeCloseModalDeliveredTask,
    subjects,
    handleChangeSubjects,
    loading,
    handleChangeLoading,
    handleChangeLoadingPrev,
    periodsPlans,
    handleChangePeriodsPlans,
    handleChangePeriodsPlans1,
    periods,
    handleChangePeriods,
    select,
    handleChangeSelect,
    handleChangeSelect1,
    handleChangeSelect2,
    degrees,
    handleChangeDegrees,
    students,
    handleChangeStudents,
    handleChangeStudents1,
    handleChangeStudents2,
    tasks,
    handleChangeTasks,
    handleChangeTasks1,
    handleChangeTasks2,
  };

  return (
    <TasksAssignedContext.Provider value={value}>
      {children}
    </TasksAssignedContext.Provider>
  );
};

const useTasksAssignedContext = () => {
  const context = useContext(TasksAssignedContext);
  if (!context) {
    throw new Error(
      "TasksAssignedContext must be used within a TasksAssignedProvider"
    );
  }
  return context;
};

export { TasksAssignedProvider, useTasksAssignedContext };
