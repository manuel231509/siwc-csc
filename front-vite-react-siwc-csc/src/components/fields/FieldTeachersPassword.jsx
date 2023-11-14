import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import Controls from "../controls/Controls";

const FieldTeachersPassword = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    typeInput,
    otherFormControlProps,
    otherInputProps,
  } = props;

  const [showTeachersPassword, setTeachersPasswords] = useState(false);

  const handleClickTeachersPassword = () => {
    setTeachersPasswords(!showTeachersPassword);
  };

  const handleMouseDownTeachersPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {typeInput === "OutlinedInput" ? (
        <Controls.OutlinedInput
          formControlProps={{
            fullWidth: true,
            required: true,
            ...otherFormControlProps,
          }}
          inputLabelProps={{
            htmlFor: "standard-adornment-password-label",
            text: "Teachers Password",
          }}
          outlinedInputProps={{
            id: "standard-adornment-password-label",
            name: "teachersPassword",
            value: fields.teachersPassword,
            onChange: handleChangeFields("teachersPassword"),
            type: showTeachersPassword ? "text" : "password",
            autoComplete: "current-teachers-password",
            disabled: fields.role === "student" && true,
            fullWidth: true,
            required: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickTeachersPassword}
                  onMouseDown={handleMouseDownTeachersPassword}
                >
                  {showTeachersPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            "aria-describedby": "componenet-error-text",
            label: "Teachers Password",
            ...otherInputProps,
          }}
          formHelperTextProps={{
            id: "component-error-text",
            sx: {
              alignItems: "center",
              textAlign: "justify",
              display: "flex",
            },
          }}
          error={errors.teachersPassword}
        />
      ) : (
        <Controls.FilledInput
          formControlProps={{
            fullWidth: true,
            required: true,
            ...otherFormControlProps,
          }}
          inputLabelProps={{
            htmlFor: "standard-adornment-password-label",
            text: "Teachers Password",
          }}
          filledInputProps={{
            id: "standard-adornment-password-label",
            name: "teachersPassword",
            value: fields.teachersPassword,
            onChange: handleChangeFields("teachersPassword"),
            type: showTeachersPassword ? "text" : "password",
            autoComplete: "current-teachers-password",
            disabled: fields.role === "student" && true,
            fullWidth: true,
            required: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickTeachersPassword}
                  onMouseDown={handleMouseDownTeachersPassword}
                >
                  {showTeachersPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            "aria-describedby": "componenet-error-text",
            label: "Teachers Password",
            ...otherInputProps,
          }}
          formHelperTextProps={{
            id: "component-error-text",
            sx: {
              alignItems: "center",
              textAlign: "justify",
              display: "flex",
            },
          }}
          error={errors.teachersPassword}
        />
      )}
    </>
  );
};

export default FieldTeachersPassword;
