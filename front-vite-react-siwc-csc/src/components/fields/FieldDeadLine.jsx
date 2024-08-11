import dayjs from "dayjs";
import Controls from "../controls/Controls";

const FieldDeadLine = ({
  fields,
  handleChangeFieldsDatePicker,
  errors,
  handleClickClose,
}) => {
  return (
    <Controls.DesktopDatePicker
      desktopDatePickerProps={{
        disablePast: true,
        disabled: fields.qualificationPoints === "0",
        label: "Deadline",
        inputFormat: "DD/MM/YYYY",
        views: ["year", "month", "day"],
        value: dayjs(fields.deadline),
        onChange: handleChangeFieldsDatePicker("deadline"),
      }}
      error={errors.deadline}
      otherTextFieldProps={{
        slotPropsTextField: {
          id: "deadline",
          clearable: true,
          onClear: handleClickClose("deadline"),
          autoFocus: Boolean(errors.deadline) ? true : false,
        },
      }}
    />
  );
};
export default FieldDeadLine;
