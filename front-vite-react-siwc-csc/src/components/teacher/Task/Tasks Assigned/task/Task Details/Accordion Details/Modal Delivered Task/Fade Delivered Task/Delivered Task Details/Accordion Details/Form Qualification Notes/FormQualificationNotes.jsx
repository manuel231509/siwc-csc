import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "../../../../../../../../../../../../hooks/useForm";
import FieldsControl from "../../../../../../../../../../../fields/FieldsControl";
import validate from "../../../../../../../../../../../fields/field validation/validate";
import { FormStyled } from "./Styled/FormQualificationNotesStyled";
import { LoadingButton } from "@mui/lab";
import Image from "mui-image";
import calification from "../../../../../../../../../../../../assets/images/calificacion_2.png";
import useFetchAndLoad from "../../../../../../../../../../../../hooks/useFetchAndLoad3";
import { useTasksAssignedContext } from "../../../../../../../../../../../../context/Tasks/TasksProvider";
import { sweetAlertButtonSubmitQualificationNote } from "../../../../../../../../../../../../sweetAlert2/SweetAlert";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { updateNoteAndCommentTeacher } from "../../../../../../../../../../../../services/published task/PublishedTaskService";

const initialStateFields = {
  comment: "",
  qualificationNote: "",
};

const FormQualificationNotes = () => {
  const theme = useTheme();
  const [fieldValidate, setFieldValidate] = useState(false);

  const { select, handleChangeCloseModalDeliveredTask } =
    useTasksAssignedContext();

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
    handleChangeFields2,
    errors,
    setErrors,
    resetFields,
  } = useForm(initialStateFields, true, validateFields);

  const { loading, callEndPoint } = useFetchAndLoad();

  const updateApiNoteAndCommentTeacher = async (publishedTask, jwt, bearer) =>
    await callEndPoint(
      updateNoteAndCommentTeacher(publishedTask, jwt, bearer),
      "",
      "qualify"
    );

  const handleClickClose = (nameField) => () => {
    handleChangeFields2({ ...fields, [nameField]: "" });
    validateFields({ [nameField]: "" });
  };

  const { jwt, bearer } = useSelector((store) => store.ssession);

  const hanldeSubmitQualificationNotes = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("select: -> ", select);
      sweetAlertButtonSubmitQualificationNote(
        theme,
        updateApiNoteAndCommentTeacher,
        select,
        fields,
        resetFields,
        handleChangeCloseModalDeliveredTask,
        jwt,
        bearer
      );
    }
  };
  return (
    <FormStyled onSubmit={hanldeSubmitQualificationNotes}>
      <Grid container alignItems="center" boxShadow={2}>
        <Grid item xs container p={1.5} rowGap={1}>
          <Grid container>
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
          </Grid>
          <Grid container>
            <FieldsControl.FieldQualificationNote
              fields={fields}
              handleChangeFields={handleChangeFields}
              errors={errors}
              otherTextFieldProps={{
                variant: "filled",
                required: true,
              }}
              handleClickClose={handleClickClose}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} p={1} rowGap={1}>
          <LoadingButton
            type="submit"
            aria-label="qualify"
            color="secondary"
            loading={loading["qualify"]}
            loadingPosition="start"
            startIcon={<Image src={calification} width={31} />}
            disabled={fieldValidate}
            variant="contained"
          >
            QUALIFY
          </LoadingButton>
        </Grid>
      </Grid>
    </FormStyled>
  );
};

export default FormQualificationNotes;
