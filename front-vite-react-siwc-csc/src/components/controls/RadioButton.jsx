import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useRadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Error as ErrorIcon } from "@mui/icons-material";
import { useStyles } from "./Styles/ControlStyles";
import { FormHelperTextStyled } from "./Styled/ControlStyled";

const RadioButton = (props) => {
  const {
    error = null,
    formControlProps,
    formLabelProps,
    radioGroupProps,
    formControlLabelProps,
    formHelperTextProps,
  } = props;

  return (
    <>
      <FormControl {...(error && { error: true })} {...formControlProps}>
        {formLabelProps && (
          <FormLabel {...formLabelProps}>{formLabelProps.label}</FormLabel>
        )}
        <RadioGroup {...radioGroupProps}>
          {formControlLabelProps?.data?.map((item) => (
            <MyFormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio value={item.value} />}
              label={item.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
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

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked
    ? {
        fontWeight: 700,
      }
    : { fontWeight: 500 },
}));

const MyFormControlLabel = (props) => {
  // MUI UseRadio Group
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
};

export default RadioButton;
