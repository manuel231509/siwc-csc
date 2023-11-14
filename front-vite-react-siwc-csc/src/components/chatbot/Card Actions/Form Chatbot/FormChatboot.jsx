import { Grid } from "@mui/material";
import React from "react";
import { FormChatbootStyled } from "./Styled/FormChatbotStyled";
import FieldsControl from "../../../fields/FieldsControl";
import { useState } from "react";
import validate from "../../../fields/field validation/validate";
import { useForm } from "../../../../hooks/useForm";
import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";
import useFetchAndLoad from "../../../../hooks/useFetchAndLoad3";
import { getPredictChatbot } from "../../../../services/chatbot/ChatbotService";

const initialStateFields = {
  messageChatbot: "",
};
const FormChatboot = ({ context }) => {
  const { handleChangeLoadingChatbot, handleChangeMessageChatbot } = context();
  const [FieldValidate, setFieldValidate] = useState(false);

  const validateFields = (fieldsValues = fields) => {
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
    errors,
    setErrors,
    resetFields,
  } = useForm(initialStateFields, true, validateFields);

  const handleClickClose = (nameField) => (e) => {
    e.preventDefault();
    handleChangeFields1(nameField, "");
    validateFields({ [nameField]: "" });
  };

  const { loading, callEndPoint } = useFetchAndLoad(handleChangeLoadingChatbot);

  const getPredictChatbotApi = async (mesg) =>
    await callEndPoint(getPredictChatbot(mesg), "predict-chat", "predict-chat");

  const handleSubmitMessageChatbot = (e) => {
    e.preventDefault();
    if (validateFields()) {
      const mesg = { name: "You", message: fields.messageChatbot };
      handleChangeMessageChatbot(mesg);
      getPredictChatbotApi(mesg)
        .then(({ data }) => {
          let msg2 = { name: "Colsace", message: data.answer };
          handleChangeMessageChatbot(msg2);
          resetFields();
        })
        .catch((error) => console.log("error chat -> ", error));
    }
  };
  return (
    <FormChatbootStyled onSubmit={handleSubmitMessageChatbot}>
      <Grid
        container
        columnGap={{ xs: 2, sm: 2.5, md: 3.5 }}
        rowGap={2}
        alignItems="center"
      >
        <FieldsControl.FieldChatbot
          fields={fields}
          handleChangeFields={handleChangeFields}
          errors={errors}
          otherTextFieldProps={{
            variant: "filled",
          }}
          handleClickClose={handleClickClose}
        />
      </Grid>
      <LoadingButton
        type="submit"
        aria-label="send message chatbot"
        color="secondary"
        size="large"
        variant="contained"
        sx={{ p: 0 }}
        loading={loading["predict-chat"]}
        loadingPosition="center"
        disabled={FieldValidate}
      >
        <Send sx={{ p: 0 }} />
      </LoadingButton>
    </FormChatbootStyled>
  );
};

export default FormChatboot;
