import { Box } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

const useForm = (
  initialStateFields = null,
  validateOnChange = false,
  validateFields = () => {},
  initialFieldsRef = {}
) => {
  const [fields, setFields] = useState(initialStateFields);
  const [fieldsRef, setFieldsRef] = useState(initialFieldsRef);
  const [errors, setErrors] = useState({});
  const ref = useRef(null);

  const handleChangeFields = (nameField) => (event) => {
    const {
      target: { value },
    } = event;
    console.log("namefield: ", nameField, value);
    if (value === "student") {
      const auxFields = { ...fields };
      auxFields.role = "student";
      delete auxFields.teachersPassword;
      setFields(auxFields);
    } else setFields({ ...fields, [nameField]: value });

    if (validateOnChange) validateFields({ [nameField]: value });
  };
  const handleChangeFields_1 = (nameField) => (event) => {
    const {
      target: { id, value },
    } = event;
    if (value === "student") {
      const auxFields = { ...fields };
      auxFields.role = "student";
      delete auxFields.teachersPassword;
      setFields(auxFields);
    } else setFields({ ...fields, [nameField]: value });

    if (validateOnChange) validateFields({ [nameField]: value }, id);
  };

  const handleChangeFields1 = (nameField, value, validate = true) => {
    setFields((prev) => ({ ...prev, [nameField]: value }));
    if (validateOnChange && validate) validateFields({ [nameField]: value });
  };
  const handleChangeFields2 = (value) => {
    setFields(value);
  };

  const handleChangeFieldsDatePicker = (nameField) => (newValue) => {
    const auxFields = { ...fields };
    if (nameField === "deadline") {
      auxFields.timeLimit = null;
    }

    auxFields[nameField] = newValue ? newValue.$d : newValue;

    setFields(auxFields);

    if (validateOnChange) {
      !validateFields(
        { [nameField]: newValue ? newValue.$d : newValue },
        nameField
      );
    }
  };

  const handleChangeFieldAutoComplete = (nameField, newValue) => {
    setFields({ ...fields, [nameField]: newValue });

    if (validateOnChange) validateFields({ [nameField]: newValue });
  };

  const resetFields = () => {
    setFields(initialStateFields);
    setErrors({});
  };

  const handleChangeFieldsRef = (nameField, currentValue) => {
    setFieldsRef((prev) => ({ ...prev, [nameField]: currentValue }));
  };

  return {
    fields,
    setFields,
    handleChangeFields,
    handleChangeFields_1,
    handleChangeFields1,
    handleChangeFields2,
    handleChangeFieldsDatePicker,
    handleChangeFieldAutoComplete,
    errors,
    setErrors,
    resetFields,
    fieldsRef,
    handleChangeFieldsRef,
  };
};

const Form = (props) => {
  const { children, ...other } = props;
  return (
    <Box component="form" noValidate {...other}>
      {children}
    </Box>
  );
};

export default { useForm, Form };
export { useForm, Form };
