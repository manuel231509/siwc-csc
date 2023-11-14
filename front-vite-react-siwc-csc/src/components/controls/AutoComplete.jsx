import { Autocomplete as MuiAutocomplete } from "@mui/material";
import Controls from "./Controls";
const AutoComplete = ({ autoCompleteProps, controlsInputProps }) => {
  return (
    <MuiAutocomplete
      {...autoCompleteProps}
      fullWidth
      renderInput={(params) => {
        params.InputProps = {
          ...params.InputProps,
          ...controlsInputProps.textFieldProps.InputProps,
        };
        params.InputLabelProps = {
          ...params.InputLabelProps,
          ...controlsInputProps.textFieldProps.InputLabelProps,
        };
        controlsInputProps.textFieldProps = {
          ...controlsInputProps.textFieldProps,
          ...params,
        };
        return <Controls.Input {...controlsInputProps} />;
      }}
    />
  );
};
export default AutoComplete;
