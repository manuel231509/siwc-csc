import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Controls from "../controls/Controls";
import useStyleField from "./Styles/FieldStyles";
import { useTheme } from "@mui/material/styles";

const FieldQualificationNote = (props) => {
  const theme = useTheme();
  const classes = useStyleField(theme);
  const {
    fields,
    handleChangeFields,
    errors,
    otherTextFieldProps,
    handleClickClose,
  } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: "qualificationNote",
        name: "qualificationNote",
        value: fields.qualificationNote || "",
        onChange: handleChangeFields("qualificationNote"),
        autoComplete: "qualification-note",
        fullWidth: true,
        required: false,
        "aria-describedby": "component-error",
        label: "Qualification Note",
        InputLabelProps: {},
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose("qualificationNote")}
            >
              {fields.qualificationNote ? (
                <IconButton aria-label="toggle close field" edge="end">
                  <Close fontSize={"small"} />
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        },
        ...otherTextFieldProps,
      }}
      formHelperTextProps={{
        id: "component-error-text",
        sx: {
          display: "flex",
          alignItems: "center",
          textAlign: "justify",
        },
      }}
      error={errors.qualificationNote}
    />
  );
};
export default FieldQualificationNote;
