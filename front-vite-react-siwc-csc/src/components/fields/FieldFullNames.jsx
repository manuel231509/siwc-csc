import React from "react";
import Controls from "../controls/Controls";

const FieldFullNames = (props) => {
  const { fields, handleChangeFields, errors, otherTextFieldProps } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: "fullNames",
        name: "fullNames",
        value: fields.fullNames || "",
        onChange: handleChangeFields("fullNames"),
        autoComplete: "full-names",
        fullWidth: true,
        autoFocus: true,
        required: true,
        "aria-describedby": "component-error-text",
        label: "Full Names",
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
      error={errors.fullNames}
    />
  );
};

export default FieldFullNames;
