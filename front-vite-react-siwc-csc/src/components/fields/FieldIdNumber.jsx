import React from "react";
import Controls from "../controls/Controls";

const FieldIdNumber = (props) => {
  const { fields, handleChangeFields, errors, otherTextFieldProps } = props;
  return (
    <>
      <Controls.Input
        textFieldProps={{
          id: "idNumber",
          name: "idNumber",
          value: fields.idNumber || "",
          onChange: handleChangeFields("idNumber"),
          autoComplete: "id-number",
          disabled: fields.documentType === "" && true,
          fullWidth: true,
          autoFocus: false,
          required: true,
          "aria-describedby": "componenet-error-text",
          label: "Id Number",
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
        error={errors.idNumber}
      />
    </>
  );
};

export default FieldIdNumber;
