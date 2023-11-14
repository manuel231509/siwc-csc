import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Controls from "../controls/Controls";
import useStyleField from "./Styles/FieldStyles";

const FieldTitle = (props) => {
  const classes = useStyleField();
  const { fields, handleChangeFields, errors, otherTextFieldProps, handleClickClose } = props;
  return (
    <Controls.Input
      textFieldProps={{
        id: "title",
        name: "title",
        value: fields.title || "",
        onChange: handleChangeFields("title"),
        autoComplete: "title",
        fullWidth: true,
        required: true,
        "aria-describedby": "component-error-text",
        label: "Title",
        InputLabelProps: {
          className: classes.fieldTitle,
        },
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose("title")}
            >
              {fields.title ? (
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
      error={errors.title}
    />
  );
};
export default FieldTitle;
