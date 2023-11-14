import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Controls from "../controls/Controls";
import useStyleField from "./Styles/FieldStyles";

const FieldInstructions = (props) => {
  const classes = useStyleField();
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
        id: "instructions",
        name: "instructions",
        value: fields.instructions || "",
        onChange: handleChangeFields("instructions"),
        autoComplete: "instructions",
        fullWidth: true,
        required: false,
        "aria-describedby": "component-error",
        label: "Instructions (Optional)",
        InputLabelProps: {},
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose("instructions")}
            >
              {fields.instructions ? (
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
      error={errors.instructions}
    />
  );
};
export default FieldInstructions;
