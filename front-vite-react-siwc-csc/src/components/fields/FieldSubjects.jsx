import React from "react";
import Controls from "../controls/Controls";

const FieldSubjects = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    handleClickFields,
    listSubjects,
    select,
  } = props;
  return (
    <Controls.Select
      formControlProps={{
        fullWidth: true,
      }}
      inputLabelProps={{
        id: "select-subjects-label",
        required: true,
        label: "Select a Subject",
        sx: {
          fontSize: { xs: 12, sm: 14, md: 16 },
        },
      }}
      selectProps={{
        labelId: "select-subjects-label",
        id: "select-subjects",
        name: "subjects",
        value: typeof fields.subjects === "object" ? "" : fields.subjects,
        onChange: handleChangeFields("subjects"),
        autoWidth: true,
        label: "Select a Subject",
        "aria-describedby": "component-error-text",
        sx: { textAlign: "center" },
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          alignItems: "center",
          textAlign: "justify",
          display: "flex",
        },
      }}
      menuItemProps={{
        onClick: handleClickFields("subjects"),
      }}
      menuItemsValues={{
        nameFieldId: "idSubject",
        nameFieldValue: "nameSubject",
      }}
      names={listSubjects}
      error={errors.subjects}
    />
  );
};

export default FieldSubjects;
