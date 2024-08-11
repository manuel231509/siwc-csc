import Controls from "../controls/Controls";

const FieldGrades = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    handleClickFields,
    listGrades,
    select,
  } = props;
  return (
    <Controls.Select
      formControlProps={{
        fullWidth: true,
      }}
      inputLabelProps={{
        id: "select-grades-label",
        required: true,
        label: "Select a Grade",
        sx: {
          fontSize: { xs: 12, sm: 14, md: 16 },
        },
      }}
      selectProps={{
        labelId: "select-grades-label",
        id: "select-grades",
        name: "grades",
        value: fields.grades ?? "",
        onChange: handleChangeFields("grades"),
        autoWidth: true,
        label: "Select a Grade",
        "aria-describedby": "component-error-text",
        sx: {
          textAlign: "center",
        },
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
        onClick: handleClickFields("grades"),
      }}
      menuItemsValues={{
        nameFieldId: "idDegree",
        nameFieldValue: "nameDegree",
      }}
      names={listGrades}
      error={errors.grades}
    />
  );
};
export default FieldGrades;
