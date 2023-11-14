import {
  FormHelperText,
  TextField,
  OutlinedInput as MuiOutlinedInput,
  FilledInput as MuiFilledInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import { useStyles } from "./Styles/ControlStyles";
import {
  FormControlStyled,
  FormHelperTextStyled,
  TextFieldStyled,
} from "./Styled/ControlStyled";

const Input = (props) => {
  const {
    error = null,
    formHelperTextProps,
    textFieldProps,
    textFieldStyledAttributes,
  } = props;
  return (
    <>
      <TextFieldStyled
        {...(error && { error: true })}
        {...textFieldProps}
        textFieldStyledAttributes={textFieldStyledAttributes}
      />
      {error && (
        <FormHelperTextStyled
          {...(error && { error: true })}
          {...formHelperTextProps}
        >
          <ErrorIcon
            fontSize="small"
            sx={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          />
          {error}
        </FormHelperTextStyled>
      )}
    </>
  );
};

const OutlinedInput = (props) => {
  const {
    formControlProps,
    inputLabelProps,
    outlinedInputProps,
    formHelperTextProps,
    error = null,
  } = props;
  return (
    <>
      <FormControlStyled
        {...(error && { error: true })}
        {...formControlProps}
        variant="outlined"
      >
        <InputLabel {...inputLabelProps}>{inputLabelProps.text}</InputLabel>
        <MuiOutlinedInput
          {...(error && { error: true })}
          {...outlinedInputProps}
        />
      </FormControlStyled>
      {error && (
        <FormHelperTextStyled
          {...(error && { error: true })}
          {...formHelperTextProps}
        >
          <ErrorIcon
            fontSize="small"
            sx={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          />
          {error}
        </FormHelperTextStyled>
      )}
    </>
  );
};

const FilledInput = (props) => {
  const {
    formControlProps,
    inputLabelProps,
    filledInputProps,
    formHelperTextProps,
    error = null,
  } = props;
  return (
    <>
      <FormControlStyled
        {...(error && { error: true })}
        {...formControlProps}
        variant="filled"
      >
        <InputLabel {...inputLabelProps}>{inputLabelProps.text}</InputLabel>
        <MuiFilledInput {...(error && { error: true })} {...filledInputProps} />
      </FormControlStyled>
      {error && (
        <FormHelperTextStyled
          {...(error && { error: true })}
          {...formHelperTextProps}
        >
          <ErrorIcon
            fontSize="small"
            sx={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
          />
          {error}
        </FormHelperTextStyled>
      )}
    </>
  );
};

export { Input, OutlinedInput, FilledInput };
