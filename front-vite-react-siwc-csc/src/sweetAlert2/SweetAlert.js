import "animate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createSession } from "../redux/states/ssessionSlice";

const MySwal = withReactContent(Swal);

const sweetAlert = (attributes) => {
  MySwal.fire({
    ...attributes,
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
    hideClass: {
      popup: "animate__animated animate__backOutDown",
    },
  });
};

const sweetAlertButtonSaveUser = async (fields, resetFields, getApi) => {
  MySwal.fire({
    icon: "question",
    title: "DO YOU WANT TO CONTINUE WITH THE REGISTRATION?",
    showDenyButton: false,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "YES",
    cancelButtonColor: "#d33",
    cancelButtonText: "CANCEL",
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
    hideClass: {
      popup: "animate__animated animate__backOutDown",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const ssession = {
        userName: fields.email,
        password: fields.password,
        rolName: `ROLE_${fields.role.toUpperCase()}`,
        studentDTO:
          fields.role === "student"
            ? {
                idNumber: fields.idNumber,
                documentType: fields.documentType,
                fullNames: fields.fullNames,
                fullSurNames: fields.fullSurNames,
                emailAddress: fields.email,
                phoneNumber: fields.phoneNumber,
              }
            : null,
        teacherDTO:
          fields.role === "teacher"
            ? {
                idNumber: fields.idNumber,
                documentType: fields.documentType,
                fullNames: fields.fullNames,
                fullSurNames: fields.fullSurNames,
                emailAddress: fields.email,
                phoneNumber: fields.phoneNumber,
              }
            : null,
      };

      getApi(ssession)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            sweetAlert(
              "success",
              "success",
              "REGISTRATION SUCCESSFUL",
              response.data.message,
              true,
              8000
            );
            resetFields();
          } else {
            sweetAlert(
              "error",
              "error",
              "REGISTRATION FAILED",
              response.data.message,
              true,
              8000
            );
          }
        })
        .catch((error) => {
          sweetAlert(
            "error",
            "error",
            "",
            error.response?.data === undefined
              ? error.message.toUpperCase()
              : error.response.data.message.toUpperCase(),
            true,
            8000
          );
        });
    }
  });
};

const sweetAlertButtonLoginSession = (
  theme,
  fields,
  resetFields,
  getApi,
  dispatch,
  navigate
) => {
  MySwal.fire({
    icon: "question",
    title: "DO YOU WANT TO LOG IN?",
    showDenyButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: theme.palette.primary.light,
    confirmButtonText: "YES",
    denyButtonText: "NO",
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
    hideClass: {
      popup: "animate__animated animate__backOutDown",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const ssession = { ...fields, jwt: "" };
      if (ssession.hasOwnProperty("email")) {
        ssession["username"] = ssession["email"];
        delete ssession["email"];
      }
      delete ssession.role;

      getApi(ssession)
        .then(({ data, status }) => {
          if (status === 200) {
            const role = data.authorities.find(
              (element) =>
                element.authority === `ROLE_${fields.role.toUpperCase()}`
            )?.authority;

            if (!!role) {
              delete data.authorities;
              dispatch(
                createSession({
                  ...data,
                  password: ssession.password,
                  role,
                  loading: false,
                })
              );
              navigate("/private", { replace: true });
            } else {
              sweetAlert({
                position: "center",
                icon: "error",
                title: "",
                text: `SORRY YOU ARE NOT A/AN ${fields.role.toUpperCase()}`,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 6500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
            }
          }
        })
        .catch((error) => {
          sweetAlert({
            position: "center",
            icon: "error",
            title: "",
            text:
              error.response?.data === undefined
                ? error.message.toUpperCase()
                : error.response?.data?.message?.toUpperCase(),
            showCancelButton: false,
            showConfirmButton: false,
            timer: 6500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        });
    }
  });
};

const sweetAlertButtonAddTask = async (
  theme,
  saveApi,
  handleUploadFiles,
  handleDeleteFiles,
  select,
  fields,
  resetFields,
  handleResetFiles,
  updateDataPeriodPlans,
  jwt,
  bearer
) => {
  MySwal.fire({
    icon: "question",
    title: "DO YOU WANT TO ADD TASK?",
    showDenyButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: theme.palette.primary.light,
    confirmButtonText: "YES",
    denyButtonText: "NO",
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
    hideClass: {
      popup: "animate__animated animate__backOutDown",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const downloadURL = await handleUploadFiles();

      const periodPlanTask = {
        idPeriod: select.periods,
        idDegSubj: `${select.grades}-${select.subjects.idSubject}`,
        ...fields.plan,
        taskDTO: {
          name: fields.title,
          description: fields.instructions,
          qualificationPoints: fields.qualificationPoints,
          datePublicationTask: new Date().toUTCString(),
          deadline: fields.deadline?.toUTCString(),
          timeLimit: fields.timeLimit?.toUTCString(),
          publishedTaskDTOs: fields.students.map((student) => {
            return { idNumberStudent: student.idNumberStudent };
          }),
          taskFileDTOs: downloadURL,
        },
      };

      saveApi(periodPlanTask, jwt, bearer)
        .then((response) => {
          console.log("data ... ", response);
          console.log("data ... ", response.data);
          if (response.status === 200 || response.status === 201) {
            sweetAlert({
              position: "center",
              icon: "success",
              title: "",
              text: response.data.message,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 6500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            resetFields();
            handleResetFiles();
            updateDataPeriodPlans();
          }
        })
        .catch(async (error) => {
          console.log("SweetAlert Button Add Task Error: ", error);
          console.log("error: ", error.response?.data?.message);
          sweetAlert({
            position: "center",
            icon: "error",
            title: "",
            text:
              error.response?.data === undefined
                ? error.message.toUpperCase()
                : error.response?.data?.message === undefined
                ? error.response?.data?.error?.toUpperCase()
                : error.response?.data?.message?.toUpperCase(),
            showCancelButton: false,
            showConfirmButton: false,
            timer: 6500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          await handleDeleteFiles();
        });
    }
  });
};
const sweetAlertButtonSubmitTaskStudent = async (
  theme,
  saveApi,
  handleUploadFiles,
  handleDeleteFiles,
  select,
  student,
  fields,
  resetFields,
  jwt,
  bearer
) => {
  const directoryPath = `${select.teacher.fullNamesTeacher} ${select.teacher.fullSurNamesTeacher}/${select.subjects.nameSubject}/${select.degree.nameDegree}/Task/${select.task.taskName}/${student.idNumberStudent}`;
  MySwal.fire({
    icon: "question",
    title: "DO YOU WANT TO ADD TASK?",
    showDenyButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: theme.palette.primary.light,
    confirmButtonText: "YES",
    denyButtonText: "NO",
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
    hideClass: {
      popup: "animate__animated animate__backOutDown",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const downloadURL = await handleUploadFiles(directoryPath);

      const selectPublishedTask = select.task.publishedTaskEntitys[0];

      const publishedTaskDTOs = {
        idPublishedTask: selectPublishedTask.idPublishedTask,
        studentComment: fields.comment,
        delivered: true,
        dateTaskDelivered: new Date(),
        publishedFileDTOs: downloadURL,
        idNumberStudent: selectPublishedTask.idNumberStudent,
        idTask: select.task.idTask,
      };

      saveApi(publishedTaskDTOs, jwt, bearer)
        .then((response) => {
          console.log("data ... ", response);
          console.log("data ... ", response.data);
          if (response.status === 200 || response.status === 201) {
            sweetAlert({
              position: "center",
              icon: "success",
              title: "",
              text: response.data.message,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 6500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            resetFields();
          }
        })
        .catch(async (error) => {
          console.log("SweetAlert Button Add Task Error: ", error);
          console.log("error: ", error.response?.data?.message);
          sweetAlert({
            position: "center",
            icon: "error",
            title: "",
            text:
              error.response?.data === undefined
                ? error.message.toUpperCase()
                : error.response?.data?.message === undefined
                ? error.response?.data?.error?.toUpperCase() === undefined
                  ? error.response?.data?.toUpperCase()
                  : error.response?.data?.error?.toUpperCase()
                : error.response?.data?.message?.toUpperCase(),
            showCancelButton: false,
            showConfirmButton: false,
            timer: 6500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          await handleDeleteFiles(directoryPath);
        });
    }
  });
};
const sweetAlertButtonSubmitQualificationNote = async (
  theme,
  saveApi,
  select,
  fields,
  resetFields,
  handleChangeCloseModalDeliveredTask,
  jwt,
  bearer
) => {
  MySwal.fire({
    icon: "question",
    title: "DO YOU WANT TO ADD QUALIFICATION?",
    showDenyButton: true,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: theme.palette.primary.light,
    confirmButtonText: "YES",
    denyButtonText: "NO",
    showClass: {
      popup: "animate__animated animate__backInDown",
    },
    hideClass: {
      popup: "animate__animated animate__backOutDown",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const selectPublishedTask =
        select.deliveredTaskStudent.publishedTaskEntitys[0];
      delete selectPublishedTask.publishedFileEntitys;
      const publishedTaskDTOs = {
        idPublishedTask: selectPublishedTask.idPublishedTask,
        teacherComment: fields.comment,
        taskNote: fields.qualificationNote,
        qualifiedTask: true,
      };

      saveApi(publishedTaskDTOs, jwt, bearer)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            sweetAlert({
              position: "center",
              icon: "success",
              title: "",
              text: response.data.message,
              showConfirmButton: false,
              showCancelButton: false,
              timer: 6500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            resetFields();
            handleChangeCloseModalDeliveredTask();
          }
        })
        .catch(async (error) => {
          console.log("SweetAlert Button Add Task Error: ", error);
          console.log("error: ", error.response?.data?.message);
          sweetAlert({
            position: "center",
            icon: "error",
            title: "",
            text:
              error.response?.data === undefined
                ? error.message.toUpperCase()
                : error.response?.data?.message === undefined
                ? error.response?.data?.error?.toUpperCase() === undefined
                  ? error.response?.data?.toUpperCase()
                  : error.response?.data?.error?.toUpperCase()
                : error.response?.data?.message?.toUpperCase(),
            showCancelButton: false,
            showConfirmButton: false,
            timer: 6500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        });
    }
  });
};

export {
  sweetAlert,
  sweetAlertButtonSaveUser,
  sweetAlertButtonLoginSession,
  sweetAlertButtonAddTask,
  sweetAlertButtonSubmitTaskStudent,
  sweetAlertButtonSubmitQualificationNote,
};
