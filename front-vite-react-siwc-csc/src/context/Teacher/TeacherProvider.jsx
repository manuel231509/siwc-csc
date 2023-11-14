import { useState, createContext, useContext } from "react";

const TeacherContext = createContext({});

const drawer_width = 290;
const TeacherProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [expandedAccordion, setExpandedAccordion] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleDrawerOpen = () => setOpen(!open);

  const handleDrawerClose = () => setOpen(false);

  const [degrees, setDegrees] = useState({
    data: [],
    error: {},
  });

  const handleChangeDegrees = (value) => {
    setDegrees(value);
  };

  const handleChangeDegrees1 = (nameField, value) => {
    setDegrees((prev) => ({ ...prev, [nameField]: value }));
  };

  const [modalData, setModalData] = useState({
    degree: {},
    subject: {},
    student: [],
  });

  const handleChangeModalData = (nameField, value) => {
    setModalData({ ...modalData, [nameField]: value });
  };

  const handleChangeExpandedAccordion =
    (panel, nameField, value) => (event, isExpanded) => {
      setExpandedAccordion(isExpanded ? panel : false);
      handleChangeModalData(nameField, value);
    };

  const handleChangeOpenModal = () => setOpenModal(true);
  const handleChangeCloseModal = () => setOpenModal(false);

  const [select, setSelect] = useState({
    grades: "",
    periods: "",
    subjects: "",
    degree: {},
  });

  const handleChangeSelect = (nameField, value) => {
    setSelect((prev) => ({ ...prev, [nameField]: value }));
  };

  const handleChangeSelect1 = (value) => {
    setSelect(value);
  };

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

  const [loading, setLoading] = useState({});
  const handleChangeLoading = (nameField, value) => {
    setLoading((prev) => ({ ...prev, [nameField]: value }));
  };

  const [periods, setPeriods] = useState({ data: [], error: {} });
  const handleChangePeriods = (nameField, value) => {
    setPeriods((prev) => ({ ...prev, [nameField]: value }));
  };

  const [subjects, setSubjects] = useState({
    data: [],
    error: {},
  });
  const handleChangeSubjects = (nameField, value) => {
    setSubjects((prev) => ({ ...prev, [nameField]: value }));
  };

  const value = {
    open,
    expandedAccordion,
    openModal,
    handleChangeExpandedAccordion,
    handleDrawerOpen,
    handleDrawerClose,
    handleChangeOpenModal,
    handleChangeCloseModal,
    drawer_width,
    degrees,
    handleChangeDegrees,
    handleChangeDegrees1,
    modalData,
    handleChangeModalData,
    select,
    handleChangeSelect,
    handleChangeSelect1,
    checkedChatbot,
    handleChangeCheckedChatbot,
    messageChatbot,
    handleChangeMessageChatbot,
    loadingChatbot,
    handleChangeLoadingChatbot,
    loading,
    handleChangeLoading,
    periods,
    handleChangePeriods,
    subjects,
    handleChangeSubjects,
  };

  return (
    <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
  );
};

const useTeacherContext = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("TeacherProvider must be used within a TeacherProvider");
  }
  return context;
};

export { TeacherProvider, useTeacherContext };
