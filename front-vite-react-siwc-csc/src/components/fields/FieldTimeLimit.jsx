import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Controls from "../controls/Controls";

const FieldTimeLimit = ({
  fields,
  handleChangeFieldsDatePicker,
  errors,
  handleClickClose,
}) => {
  return (
    <Controls.DesktopTimePicker
      desktopTimePickerProps={{
        disablePast: true,
        label: "Time Limit",
        value: fields.timeLimit,
        onChange: handleChangeFieldsDatePicker("timeLimit"),
      }}
      otherTextFieldProps={{
        sx: {
          fontSize: { xs: 12, sm: 14, md: 16 },
        },
        required: Boolean(fields.deadline),
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              {fields.timeLimit ? (
                <IconButton
                  aria-label="toggle close field"
                  edge="end"
                  onClick={handleClickClose("timeLimit")}
                >
                  <Close fontSize={"small"} />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
          sx: {
            fontSize: { xs: 12, sm: 14, md: 16 },
          },
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
      error={errors.timeLimit}
    />
  );
};
export default FieldTimeLimit;
