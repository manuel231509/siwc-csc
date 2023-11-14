import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Controls from "../controls/Controls";
import useStyleField from "./Styles/FieldStyles";
import { useTheme } from "@mui/material/styles";

const FieldComment = (props) => {
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
        id: "comment",
        name: "comment",
        value: fields.comment || "",
        onChange: handleChangeFields("comment"),
        autoComplete: "comment",
        fullWidth: true,
        required: false,
        "aria-describedby": "component-error",
        label: "Comment (Optional)",
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose("comment")}
            >
              {fields.comment ? (
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
      error={errors.comment}
    />
  );
};
export default FieldComment;
