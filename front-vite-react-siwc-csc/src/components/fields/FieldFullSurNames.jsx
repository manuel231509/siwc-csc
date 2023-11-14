import React from "react";
import Controls from "../controls/Controls";

const FieldFullSurNames = (props) => {
  const { fields, handleChangeFields, errors, otherTextFieldProps } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: "fullSurNames",
        name: "fullSurNames",
        value: fields.fullSurNames || "",
        onChange: handleChangeFields("fullSurNames"),
        autoComplete: "full-surnames",
        fullWidth: true,
        autoFocus: false,
        required: true,
        "aria-describedby": "componenet-error-text",
        label: "Full SurNames",
        ...otherTextFieldProps,
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          alignItems: "center",
          textAlign: "justify",
          display: "flex",
        },
      }}
      error={errors.fullSurNames}
    />
  );
};

export default FieldFullSurNames;
