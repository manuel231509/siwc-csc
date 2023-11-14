import {
  AttachFile as AttachFileIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Badge, Grid, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "mui-image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import taskSumbit from "../../../../../../../../../assets/images/submit_task.png";
import { useStudentContext } from "../../../../../../../../../context/Student/StudentProvider";
import {
  deleteFile,
  uploadFile,
} from "../../../../../../../../../firebase/config-firebase";
import useFetchAndLoad from "../../../../../../../../../hooks/useFetchAndLoad2";
import { useForm } from "../../../../../../../../../hooks/useForm";
import useWindowSize from "../../../../../../../../../hooks/useWindowSize";
import { updateDateDeliveredAndTaskDelivered } from "../../../../../../../../../services/published task/PublishedTaskService";
import { sweetAlertButtonSubmitTaskStudent } from "../../../../../../../../../sweetAlert2/SweetAlert";
import { FormHelperTextStyled } from "../../../../../../../../controls/Styled/ControlStyled";
import FieldsControl from "../../../../../../../../fields/FieldsControl";
import validate from "../../../../../../../../fields/field validation/validate";
import MultipleFileUploadField from "../../../../../../../../teacher/Task/Tasks Assigned/tasks/Add Task/Modal Add Task/Fade Add Task/Form Add Task/Upload Field/MultipleFileUploadField";
import { FormStyled } from "./Styled/FormDelverTaskStyled";

const initialStateFields = {
  comment: "",
  files: [],
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const FormDeliverTask = () => {
  const theme = useTheme();
  const windowSize = useWindowSize();

  const { loading, handleChangeLoading, select } = useStudentContext();

  const [fieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldsValues = fields, nameField) => {
    const tempErrors = { ...errors };

    validate(fieldsValues, tempErrors, fields);

    setErrors({ ...tempErrors });

    const fieldValid = Object.values(tempErrors).every((v) => v === "");

    setFieldValidate(!fieldValid);

    if (fieldsValues === fields) {
      return fieldValid;
    }
  };

  const {
    fields,
    handleChangeFields,
    handleChangeFields1,
    handleChangeFields2,
    errors,
    setErrors,
    resetFields,
  } = useForm(initialStateFields, true, validateFields);

  const handleClickClose = (nameField) => () => {
    handleChangeFields2({
      ...fields,
      [nameField]: "",
    });

    validateFields({
      [nameField]: "",
    });
  };

  const handleChangeFieldsFiles = (value) => {
    handleChangeFields1("files", value);
  };

  const { session, jwt, bearer } = useSelector((store) => store.ssession);

  const { student } = session;

  const [downloadURL, setDownloadURL] = useState([]);
  const handleChangeDownloadURL = (downloadURL) => {
    setDownloadURL((prevUrls) => [...prevUrls, downloadURL]);
  };
  const handleChangeDownloadURL1 = (arrayDownloadURL) => {
    setDownloadURL(arrayDownloadURL);
  };

  const handleUploadFiles = async (directoryPath) => {
    let arrayDownloadURL = [];
    for (const file in fields.files) {
      if (Object.hasOwnProperty.call(fields.files, file)) {
        const element = fields.files[file];
        const resultURL = await uploadFile(
          element,
          directoryPath,
          handleChangeLoading,
          "publishedTask"
        );
        arrayDownloadURL.push(resultURL);
      }
    }
    handleChangeDownloadURL1(arrayDownloadURL);
    return arrayDownloadURL;
  };

  const handleDeleteFiles = async (directoryPath) => {
    for (const file in fields.files) {
      if (Object.hasOwnProperty.call(fields.files, file)) {
        const element = fields.files[file];
        await deleteFile(element, directoryPath);
      }
    }
    handleChangeDownloadURL1([]);
  };

  const { callEndPoint } = useFetchAndLoad();

  const updateApiDateDeliveredAndTaskDelivered = async (
    publishedTask,
    jwt,
    bearer
  ) =>
    await callEndPoint(
      updateDateDeliveredAndTaskDelivered(publishedTask, jwt, bearer),
      "publishedTask",
      "publishedTask"
    );

  const handleSubmitDeliverTask = (e) => {
    e.preventDefault();
    if (validateFields()) {
      sweetAlertButtonSubmitTaskStudent(
        theme,
        updateApiDateDeliveredAndTaskDelivered,
        handleUploadFiles,
        handleDeleteFiles,
        select,
        student,
        fields,
        resetFields,
        jwt,
        bearer
      );
    }
  };

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <FormStyled
        sx={{
          width:
            windowSize.width > 900 && windowSize.width <= 1000
              ? "70vw"
              : windowSize.width > 1000 && windowSize.width <= 1200
              ? "65vw"
              : windowSize.width > 1200 && windowSize.width <= 1300
              ? "50vw"
              : "45vw",
        }}
        onSubmit={handleSubmitDeliverTask}
      >
        <Grid
          container
          columnGap={{ xs: 2, sm: 2.5, md: 3.5 }}
          rowGap={2}
          alignItems="center"
        >
          <Grid
            item
            xs
            container
            rowGap={1.5}
            boxShadow={5}
            sx={{
              padding: 1.5,
              ...(windowSize.width > 400 && windowSize.width < 420
                ? {
                    maxWidth: "39vw",
                  }
                : windowSize.width >= 420 &&
                  windowSize.width <= 450 && {
                    maxWidth: "100vw",
                  }),
            }}
          >
            <FieldsControl.FieldComment
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              otherTextFieldProps={{
                variant: "filled",
                multiline: true,
                rows: 6,
              }}
              handleClickClose={handleClickClose}
            />
            <Grid
              container
              mt={1}
              p={1.5}
              sx={{
                border: "1px solid gray",
                borderRadius: "12px",
              }}
            >
              <Grid
                container
                justifyContent={"center"}
                pb={1}
                borderBottom={"1px solid gray"}
              >
                <StyledBadge
                  sx={{ mr: "1rem" }}
                  badgeContent={fields?.files?.length}
                  color="secondary"
                >
                  <AttachFileIcon />
                </StyledBadge>
                <Typography
                  variant="subtitle1"
                  fontSize={12}
                  fontWeight={600}
                  letterSpacing=".17rem"
                >
                  ATTACH FILE
                </Typography>
              </Grid>
              <MultipleFileUploadField
                files={fields.files}
                handleChangeFieldsFiles={handleChangeFieldsFiles}
                windowSize={windowSize}
              />
              {errors.files && (
                <FormHelperTextStyled
                  {...(errors.files && { error: true })}
                  {...{
                    id: "component-error-text",
                    sx: {
                      display: "flex",
                      alignItems: "center",
                      textAlign: "justify",
                    },
                  }}
                >
                  <ErrorIcon
                    fontSize="small"
                    sx={{
                      marginLeft: "0.5rem",
                      marginRight: "0.5rem",
                    }}
                  />
                  {errors.files}
                </FormHelperTextStyled>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid container mt={3} mb={0} rowSpacing={5} justifyContent="center">
          <LoadingButton
            type="submit"
            aria-label="add a taks"
            color="secondary"
            size="large"
            loading={loading["publishedTask"]}
            loadingPosition="start"
            startIcon={<Image src={taskSumbit} width={31} />}
            // disabled={fieldValidate}
            variant="contained"
          >
            <span>Submit Task</span>
          </LoadingButton>
        </Grid>
      </FormStyled>
    </Grid>
  );
};

export default FormDeliverTask;
