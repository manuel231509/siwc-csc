import Controls from "../controls/Controls";

const FieldQualificationPoints = (props) => {
  const { fields, handleChangeFields, errors, listQualificationPoints } = props;
  return (
    <Controls.Select
      formControlProps={{
        fullWidth: true,
      }}
      inputLabelProps={{
        id: "select-qualificationPoints-label",
        required: true,
        label: "Qualification Points",
        sx: {
          fontSize: { xs: 12, sm: 14, md: 16 },
        },
      }}
      selectProps={{
        labelId: "select-qualificationPoints-label",
        id: "select-qualificationPoints",
        name: "qualificationPoints",
        value: fields.qualificationPoints,
        onChange: handleChangeFields("qualificationPoints"),
        autoWidth: true,
        label: "Qualification Points",
        "aria-describedby": "component-error-text",
        sx: {
          textAlign: "center",
          fontSize: { xs: 12, sm: 14, md: 16 },
        },
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
        },
      }}
      menuItemProps={{}}
      menuItemsValues={{
        nameFieldId: "id",
        nameFieldValue: "name",
      }}
      names={listQualificationPoints}
      error={errors.qualificationPoints}
    />
  );
};
export default FieldQualificationPoints;
