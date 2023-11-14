import Controls from "../controls/Controls";

const FieldAssignNoteTask = (props) => {
  const {
    fields,
    handleChangeFields,
    errors,
    otherTextFieldProps,
    handleClickClose,
    textFieldStyledAttributes,
  } = props;

  return (
    <Controls.Input
      textFieldProps={{
        required: false,
        InputLabelProps: {},
        InputProps: {
          sx: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              overflow: "hidden",
            },
            fontSize: { xs: 10, sm: 12, md: 13, lg: 13, xl: 14 },
          },
        },
        ...otherTextFieldProps,
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
          fontSize: "7px",
        },
      }}
      error={errors}
      textFieldStyledAttributes={textFieldStyledAttributes}
    />
  );
};
export default FieldAssignNoteTask;
