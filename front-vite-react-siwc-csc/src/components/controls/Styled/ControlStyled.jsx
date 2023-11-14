import { FormControl, FormHelperText, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const fontWeightLabelText = (theme) => ({
  fontWeight: 800,
  "& label": {
    [theme.breakpoints.between(0, 500)]: {
      fontSize: 12,
    },
    fontWeight: 500,
    "&.Mui-focused": {
      fontWeight: 700,
    },
  },
});

export const FormControlStyled = styled(FormControl)(({ theme }) =>
  fontWeightLabelText(theme)
);
export const FormHelperTextStyled = styled(FormHelperText)(({ theme }) =>
  fontWeightLabelText(theme)
);

export const TextFieldStyled = styled(
  ({ theme, textFieldStyledAttributes, ...otherProps }) => (
    <TextField {...otherProps} />
  )
)(({ theme, textFieldStyledAttributes }) => ({
  ...fontWeightLabelText(theme),
  ...(Boolean(textFieldStyledAttributes) && textFieldStyledAttributes(theme)),
}));
