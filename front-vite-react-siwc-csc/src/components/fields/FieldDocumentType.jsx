import React from "react";
import Controls from "../controls/Controls";

const FieldDocumentType = (props) => {
  const { fields, handleChangeFields, errors } = props;
  const names = [
    "Civil Register of Birth",
    "Identification Card",
    "Citizenship Card",
  ];
  return (
    <Controls.Select
      formControlProps={{
        fullWidth: true,
      }}
      inputLabelProps={{
        id: "select-document-type-label",
        required: true,
        label: "Document Type",
      }}
      selectProps={{
        labelId: "select-document-type-label",
        id: "select-document-type",
        name: "documentType",
        value: fields.documentType,
        onChange: handleChangeFields("documentType"),
        autoWidth: true,
        label: "Document Type",
        "aria-describedby": "componenet-error-text",
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          alignItems: "center",
          textAlign: "justify",
          display: "flex",
        },
      }}
      names={names}
      error={errors.documentType}
    />
  );
};

export default FieldDocumentType;
