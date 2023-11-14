import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { useState, useEffect } from "react";
import Controls from "../controls/Controls";

const FieldPassword = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    typeInput,
    otherFormControlProps,
    otherInputProps,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log(typeInput);
  }, [typeInput]);

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
            text: "Password",
          }}
          outlinedInputProps={{
            id: "standard-adornment-password-label",
            name: "password",
            value: fields.password,
            onChange: handleChangeFields("password"),
            type: showPassword ? "text" : "password",
            autoComplete: "current-password",
            fullWidth: true,
            required: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            "aria-describedby": "componenet-error-text",
            label: "Password",
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
          error={errors.password}
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
            text: "Password",
          }}
          filledInputProps={{
            id: "standard-adornment-password-label",
            name: "password",
            value: fields.password,
            onChange: handleChangeFields("password"),
            type: showPassword ? "text" : "password",
            autoComplete: "current-password",
            fullWidth: true,
            required: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            "aria-describedby": "componenet-error-text",
            label: "Password",
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
          error={errors.password}
        />
      )}
    </>
  );
};

export default FieldPassword;
