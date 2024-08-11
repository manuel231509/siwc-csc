import { lazy } from "react";
const FieldFullNames = lazy(() => import("./FieldFullNames"));
const FieldFullSurNames = lazy(() => import("./FieldFullSurNames"));
const FieldDocumentType = lazy(() => import("./FieldDocumentType"));
const FieldIdNumber = lazy(() => import("./FieldIdNumber"));
const FieldPhoneNumber = lazy(() => import("./FieldPhoneNumber"));
const FieldEmail = lazy(() => import("./FieldEmail"));
const FieldPassword = lazy(() => import("./FieldPassword"));
const FieldRole = lazy(() => import("./FieldRole"));
const FieldTeachersPassword = lazy(() => import("./FieldTeachersPassword"));
const FieldGrades = lazy(() => import("./FieldGrades"));
const FieldTitle = lazy(() => import("./FieldTitle"));
const FieldInstructions = lazy(() => import("./FieldInstructions"));
const FieldPeriod = lazy(() => import("./FieldPeriod"));
const FieldStudents = lazy(() => import("./FieldStudents"));
const FieldQualificationPoints = lazy(() =>
  import("./FieldQualificationPoints")
);
const FieldDeadLine = lazy(() => import("./FieldDeadLine"));
const FieldTimeLimit = lazy(() => import("./FieldTimeLimit"));
const FieldPlan = lazy(() => import("./FieldPlan"));
const FieldSubjects = lazy(() => import("./FieldSubjects"));
const FieldComment = lazy(() => import("./FieldComment"));
const FieldQualificationNote = lazy(() => import("./FieldQualificationNote"));
const FieldChatbot = lazy(() => import("./FieldChatbot"));
const FieldAssignNoteTask = lazy(() => import("./FieldAssignNoteTask"));
const FieldAchievements = lazy(() => import("./FieldAchievements"));
const FieldAchievementDescription = lazy(() =>
  import("./FieldAchievementDescription")
);

const FieldsControl = {
  FieldFullNames,
  FieldFullSurNames,
  FieldDocumentType,
  FieldIdNumber,
  FieldPhoneNumber,
  FieldEmail,
  FieldPassword,
  FieldRole,
  FieldTeachersPassword,
  FieldGrades,
  FieldTitle,
  FieldInstructions,
  FieldPeriod,
  FieldStudents,
  FieldQualificationPoints,
  FieldDeadLine,
  FieldTimeLimit,
  FieldPlan,
  FieldSubjects,
  FieldComment,
  FieldQualificationNote,
  FieldChatbot,
  FieldAssignNoteTask,
  FieldAchievements,
  FieldAchievementDescription,
};

export default FieldsControl;
