import React from "react";
import Controls from "../controls/Controls";

const FieldPhoneNumber = (props) => {
  const { fields, handleChangeFields, errors, otherTextFieldProps } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: "phoneNumber",
        name: "phoneNumber",
        value: fields.phoneNumber || "",
        onChange: handleChangeFields("phoneNumber"),
        autoComplete: "phone-number",
        fullWidth: true,
        autoFocus: false,
        required: true,
        "aria-describedby": "componenet-error-text",
        label: "Phone Number",
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
      error={errors.phoneNumber}
    />
  );
};

export default FieldPhoneNumber;
