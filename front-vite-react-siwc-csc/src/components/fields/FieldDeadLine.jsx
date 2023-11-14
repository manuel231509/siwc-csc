import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
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
        value: fields.deadline,
        onChange: handleChangeFieldsDatePicker("deadline"),
      }}
      error={errors.deadline}
      otherTextFieldProps={{
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose("deadline")}
            >
              {fields.deadline ? (
                <IconButton aria-label="toggle close field" edge="end">
                  <Close fontSize={"small"} />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default FieldDeadLine;
