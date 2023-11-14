import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Controls from "../controls/Controls";

const FieldChatbot = (props) => {
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
        id: "messageChatbot",
        name: "messageChatbot",
        value: fields.messageChatbot || "",
        onChange: handleChangeFields("messageChatbot"),
        autoComplete: "message-chatbot",
        fullWidth: true,
        required: false,
        "aria-describedby": "component-error",
        placeholder: "Type Here Message...",
        sx: { backgroundColor: "whitesmoke" },
        inputProps: {
          sx: { pt: 1.5, pb: 1.5 },
        },
        InputProps: {
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={handleClickClose("messageChatbot")}
            >
              {fields.messageChatbot ? (
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
          fontSize: "10px",
          width: "100%",
          pr: "20px",
          mt: "-13px",
          backgroundColor: "whitesmoke",
        },
      }}
      error={errors.messageChatbot}
    />
  );
};
export default FieldChatbot;
