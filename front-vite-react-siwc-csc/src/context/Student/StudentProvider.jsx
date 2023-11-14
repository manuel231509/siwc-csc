import { createContext, useContext, useState } from "react";

const StudentContext = createContext({});

const drawer_width = 290;
const StudentProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(!open);

  const handleDrawerClose = () => setOpen(false);

  const [loading, setLoading] = useState({});
  const handleChangeLoading = (nameField, value) => {
    setLoading({ ...loading, [nameField]: value });
  };
  const handleChangeLoading1 = (value) => {
    setLoading(value);
  };

  const [subjects, setSubjects] = useState([]);
  const handleChangeSubjects = (value) => {
    setSubjects(value);
  };

  const [tasks, setTasks] = useState({
    value: {},
    error: {},
  });
  const handleChangeTasks = (value) => {
    setTasks(value);
  };

  const [expandedAccordionTaskDetails, setExpandedAccordionTaskDetails] =
    useState(false);
  const handleChangeExpandedAccordionTaskDetails =
    (panel) => (event, isExpanded) => {
      setExpandedAccordionTaskDetails(isExpanded ? panel : false);
    };

  const [select, setSelect] = useState({
    grades: "",
    periods: "",
    subjects: "",
    degree: {},
    task: {},
    teacher: {},
  });

  const handleChangeSelect = (nameField, value) => {
    setSelect({ ...select, [nameField]: value });
  };

  const handleChangeSelect1 = (value) => {
    setSelect(value);
  };

  const [openModalDeliverTask, setOpenModalDeliverTask] = useState(false);

  const handleChangeOpenModalDeliverTask = () => setOpenModalDeliverTask(true);

  const handleChangeCloseModalDeliverTask = () =>
    setOpenModalDeliverTask(false);

  const [checkedChatbot, setCheckedChatbot] = useState(false);

  const handleChangeCheckedChatbot = () => {
    setCheckedChatbot((prev) => !prev);
  };

  const [messageChatbot, setMessageChatbot] = useState([]);

  const handleChangeMessageChatbot = (value) => {
    setMessageChatbot((prev) => [value, ...prev]);
  };

  const [loadingChatbot, setLoadingChatbot] = useState({
    "predict-chat": false,
  });

  const handleChangeLoadingChatbot = (nameField, value) => {
    setLoadingChatbot((prev) => ({ ...prev, [nameField]: value }));
  };

  const subjectid = {
    "FIR-PER": 1,
    "SEC-PER": 2,
    "THI-PER": 3,
    "FOU-PER": 4,
  };

  const [periods, setPeriods] = useState({
    data: [],
    error: {},
  });

  const handleChangePeriods = (nameField, value) =>
    setPeriods((prev) => ({
      ...prev,
      [nameField]: value,
    }));

  const [student, setStudent] = useState({});
  const handleChangeStudent = (nameField, value) => {
    setStudent((prev) => ({ ...prev, [nameField]: value }));
  };
  const handleChangeStudentObject = (value) => {
    setStudent((prev) => ({ ...prev, value }));
  };

  const value = {
    open,
    handleDrawerOpen,
    handleDrawerClose,
    drawer_width,
    loading,
    handleChangeLoading,
    handleChangeLoading1,
    subjects,
    handleChangeSubjects,
    tasks,
    handleChangeTasks,
    expandedAccordionTaskDetails,
    handleChangeExpandedAccordionTaskDetails,
    select,
    handleChangeSelect,
    handleChangeSelect1,
    openModalDeliverTask,
    handleChangeOpenModalDeliverTask,
    handleChangeCloseModalDeliverTask,
    checkedChatbot,
    handleChangeCheckedChatbot,
    messageChatbot,
    handleChangeMessageChatbot,
    loadingChatbot,
    handleChangeLoadingChatbot,
    subjectid,
    periods,
    handleChangePeriods,
    student,
    handleChangeStudent,
    handleChangeStudentObject,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("StudentContext must be used within a StudentProvider");
  }
  return context;
};

export { StudentProvider, useStudentContext };
