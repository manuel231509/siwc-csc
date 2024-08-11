import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  Grid,
} from "@mui/material";
import Controls from "./Controls";
const AutoComplete = ({ autoCompleteProps, controlsInputProps, loading }) => {
  return (
    <MuiAutocomplete
      {...autoCompleteProps}
      fullWidth
      renderInput={(params) => {
        params.InputProps = {
          ...controlsInputProps.textFieldProps.InputProps,
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
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
