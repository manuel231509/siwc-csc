import dayjs from "dayjs";
import Controls from "../controls/Controls";

const FieldTimeLimit = ({
  fields,
  handleChangeFieldsDatePicker,
  errors,
  handleClickClose,
}) => {
  const disablePast =
    dayjs(fields.deadline).format("DD/MM/YYYY") ===
    dayjs(Date()).format("DD/MM/YYYY");
  return (
    <Controls.DesktopTimePicker
      desktopTimePickerProps={{
        disablePast: disablePast,
        label: "Time Limit",
        value: fields.timeLimit ? dayjs(fields.timeLimit) : null,
        onChange: handleChangeFieldsDatePicker("timeLimit"),
        autoFocus: Boolean(errors.timeLimit) ? true : false,
      }}
      error={errors.timeLimit}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
        },
      }}
      otherTextFieldProps={{
        slotPropsTextField: {
          variant: "filled",
          required: Boolean(fields.deadline),
          clearable: true,
          onClear: handleClickClose("timelimit"),
          fullWidth: true,
        },
      }}
    />
  );
};
export default FieldTimeLimit;
