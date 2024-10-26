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
        value: fields.deadline ? dayjs(fields.deadline) : null,
        onChange: handleChangeFieldsDatePicker("deadline"),
      }}
      error={errors.deadline}
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
          clearable: true,
          onClear: handleClickClose("deadline"),
          fullWidth: true,
          required:
            fields.qualificationPoints !== "" &&
            Number(fields.qualificationPoints) > 0,
          ...(Boolean(errors.deadline) && { error: true }),
        },
      }}
    />
  );
};
export default FieldDeadLine;
