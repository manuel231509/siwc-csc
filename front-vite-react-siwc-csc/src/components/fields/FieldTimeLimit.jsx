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
        value: dayjs(fields.timeLimit),
        onChange: handleChangeFieldsDatePicker("timeLimit"),
        autoFocus: Boolean(errors.timeLimit) ? true : false,
      }}
      error={errors.timeLimit}
      otherTextFieldProps={{
        required: Boolean(fields.deadline),
        slotPropsTextField: {
          id: "timelimit",
          clearable: true,
          onClear: handleClickClose("timelimit"),
        },
      }}
    />
  );
};
export default FieldTimeLimit;
