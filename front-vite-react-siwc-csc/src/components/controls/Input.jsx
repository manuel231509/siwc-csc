import { Error as ErrorIcon } from "@mui/icons-material";
import {
  InputLabel,
  FilledInput as MuiFilledInput,
  OutlinedInput as MuiOutlinedInput,
} from "@mui/material";
import { lazy } from "react";
import {
  SuspenseProgress,
  SuspenseProgressSkeleton,
} from "../SuspenseProgress/SusProg";

const FormControlStyled = lazy(() =>
  import("./Styled/ControlStyled").then((module) => ({
    default: module.FormControlStyled,
  }))
);

const FormHelperTextStyled = lazy(() =>
  import("./Styled/ControlStyled").then((module) => ({
    default: module.FormHelperTextStyled,
  }))
);

const TextFieldStyled = lazy(() =>
  import("./Styled/ControlStyled").then((module) => ({
    default: module.TextFieldStyled,
  }))
);

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
        {...(Boolean(error) && { error: true })}
        {...textFieldProps}
        textFieldStyledAttributes={textFieldStyledAttributes}
      />
      {error && (
        <SuspenseProgressSkeleton
          skeletonProps={{
            variant: "rectangular",
            animation: "wave",
            sx: { minWidth: "100%" },
          }}
        >
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
        </SuspenseProgressSkeleton>
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
        <SuspenseProgressSkeleton
          skeletonProps={{
            variant: "rectangular",
            animation: "wave",
            sx: { minWidth: "100%" },
          }}
        >
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
        </SuspenseProgressSkeleton>
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
        <SuspenseProgressSkeleton
          skeletonProps={{
            variant: "rectangular",
            animation: "wave",
            sx: { minWidth: "100%" },
          }}
        >
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
        </SuspenseProgressSkeleton>
      )}
    </>
  );
};

export { FilledInput, Input, OutlinedInput };
