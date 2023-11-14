import React from "react";
import Controls from "../controls/Controls";

const FieldRole = (props) => {
  const { fields, handleChangeFields, errors } = props;
  return (
    <>
      <Controls.RadioButton
        formControlProps={{ fullWidth: true }}
        radioGroupProps={{
          row: true,
          "aria-labelledby": "component-error-text",
          name: "role",
          value: fields.role,
          onChange: handleChangeFields("role"),
          sx: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        formControlLabelProps={{
          data: [
            { value: "teacher", label: "Teacher" },
            { value: "student", label: "Student" },
          ],
        }}
        formHelperTextProps={{
          id: "component-error-text",
          sx: {
            alignItems: "center",
            textAlign: "justify",
            display: "flex",
          },
        }}
        error={errors.role}
      />
    </>
  );
};

export default FieldRole;
