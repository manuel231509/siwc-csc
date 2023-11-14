import Controls from "../controls/Controls";

const FieldPeriod = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    handleClickFields = () => {},
    listPeriods,
  } = props;

  return (
    <Controls.Select
      formControlProps={{
        fullWidth: true,
      }}
      inputLabelProps={{
        id: "select-period-label",
        required: true,
        label: "Select a Period",
        sx: { fontSize: { xs: 12, sm: 14, md: 16 } },
      }}
      selectProps={{
        labelId: "select-period-label",
        id: "select-periods",
        name: "periods",
        value: fields.periods,
        onChange: handleChangeFields("periods"),
        autoWidth: true,
        label: "Select a Period",
        "aria-describedby": "component-error-text",
        sx: {
          textAlign: "center",
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
      menuItemProps={{
        onClick: handleClickFields("periods"),
      }}
      menuItemsValues={{
        nameFieldId: "idPeriod",
        nameFieldValue: "periodName",
      }}
      names={listPeriods}
      error={errors.periods}
    />
  );
};
export default FieldPeriod;
