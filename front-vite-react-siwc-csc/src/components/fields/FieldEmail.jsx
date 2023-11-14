import React from "react";
import Controls from "../controls/Controls";

const FieldEmail = (props) => {
  const { fields, handleChangeFields, errors, otherTextFieldProps } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: "email",
        name: "email",
        value: fields.email || "",
        onChange: handleChangeFields("email"),
        autoComplete: "email",
        fullWidth: true,
        autoFocus: false,
        required: true,
        "aria-describedby": "componenet-error-text",
        label: "Email Address",
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
      error={errors.email}
    />
  );
};

export default FieldEmail;
