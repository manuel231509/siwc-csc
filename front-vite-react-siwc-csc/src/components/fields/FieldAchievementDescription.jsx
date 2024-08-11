import { InputAdornment } from "@mui/material";
import React from "react";
import Controls from "../controls/Controls";

const FieldAchievementDescription = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    otherTextFieldProps,
    handleClickClose,
    nameField,
  } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: nameField,
        name: nameField,
        value: fields[nameField] ?? "",
        onChange: handleChangeFields(nameField),
        autoComplete: nameField,
        fullWidth: true,
        required: false,
        "aria-describedby": "component-error",
        label: "Instructions (Optional)",
        InputLabelProps: {},
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose(nameField)}
            >
              {fields[nameField] ? (
                <IconButton aria-label="toggle close field" edge="end">
                  <Close fontSize={"small"} />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        },
        ...otherTextFieldProps,
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
        },
      }}
      error={errors[nameField]}
    />
  );
};
export default FieldAchievementDescription;
