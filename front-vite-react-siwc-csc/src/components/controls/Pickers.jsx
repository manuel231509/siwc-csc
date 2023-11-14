import {
  DatePicker as DatePickerMui,
  DesktopDatePicker as DesktopDatePickerMui,
  DesktopTimePicker as DesktopTimePickerMui,
  LocalizationProvider as LocalizationProviderMui,
  MobileDatePicker as MobileDatePickerMui,
  TimePicker as TimePickerMui
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Controls from "./Controls";
import { useStyles } from "./Styles/ControlStyles";

const LoacalizationProvider = ({ children }) => {
  return (
    <LocalizationProviderMui dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProviderMui>
  );
};

const DatePicker = ({ datePickerProps, error }) => {
  return (
    <LoacalizationProvider>
      <DatePickerMui
        {...datePickerProps}
        renderInput={(params) => (
          <Controls.Input
            textFieldProps={{
              variant: "filled",
              id: "deadline",
              name: "deadline",
              autoComplete: "deadline",
              fullWidth: true,
              required: true,
              "aria-describedby": "component-error-text",
              ...params,
              error: params.error || error,
            }}
            formHelperTextProps={{
              id: "component-error-text",
              sx: {
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              },
            }}
            error={error}
          />
        )}
      />
    </LoacalizationProvider>
  );
};

const DesktopDatePicker = ({
  desktopDatePickerProps,
  error,
  otherTextFieldProps,
}) => {
  const classes = useStyles();
  const { InputProps } = otherTextFieldProps;
  return (
    <LoacalizationProvider>
      <DesktopDatePickerMui
        {...desktopDatePickerProps}
        InputProps={{
          sx: {
            fontSize: { xs: 12, sm: 14, md: 16 },
          },
        }}
        PopperProps={{
          className: classes.desktopDatePicker,
          color: "blue",
          sx: {},
        }}
        renderInput={(params) => {
          const tempEndAdorment = {
            ...params.InputProps.endAdornment,
            ["props"]: {
              ...params.InputProps.endAdornment.props,
              ["position"]: "start",
              ["children"]: {
                ...params.InputProps.endAdornment.props.children,
                ["props"]: {
                  ...params.InputProps.endAdornment.props.children.props,
                  ["edge"]: "start",
                },
              },
            },
          };

          const tempInputProps = {
            ...params.InputProps,
            ["endAdornment"]: InputProps.endAdornment,
            ["startAdornment"]: tempEndAdorment,
          };
          return (
            <Controls.Input
              textFieldProps={{
                variant: "filled",
                id: "deadline",
                name: "deadline",
                autoComplete: "deadline",
                fullWidth: true,
                "aria-describedby": "component-error-text",
                ...otherTextFieldProps,
                ...params,
                error: Boolean(params.error || error),
                InputLabelProps: {
                  className: classes.inputLabelProps,
                },
                InputProps: tempInputProps,
                sx: {
                  "& .MuiInputAdornment-root.MuiInputAdornment-positionStart": {
                    height: "3em",
                    maxHeight: "5em",
                    marginTop: "24px !important",
                  },
                },
              }}
              formHelperTextProps={{
                id: "component-error-text",
                sx: {
                  display: "flex",
                  alignItems: "center",
                  textAlign: "justify",
                },
              }}
              error={error}
            />
          );
        }}
      />
    </LoacalizationProvider>
  );
};

const MobileDatePicker = ({ mobileDatePickerProps, error }) => {
  return (
    <LoacalizationProvider>
      <MobileDatePickerMui
        {...mobileDatePickerProps}
        renderInput={(params) => (
          <Controls.Input
            textFieldProps={{
              variant: "filled",
              id: "deadline",
              name: "deadline",
              autoComplete: "deadline",
              fullWidth: true,
              required: true,
              "aria-describedby": "component-error-text",
              ...params,
              error: params.error || error,
            }}
            formHelperTextProps={{
              id: "component-error-text",
              sx: {
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              },
            }}
            error={error}
          />
        )}
      />
    </LoacalizationProvider>
  );
};

const DesktopTimePicker = ({
  desktopTimePickerProps,
  otherTextFieldProps,
  formHelperTextProps,
  error,
}) => {
  const classes = useStyles();
  const { InputProps } = otherTextFieldProps;
  return (
    <LoacalizationProvider>
      <DesktopTimePickerMui
        {...desktopTimePickerProps}
        renderInput={(params) => {
          const tempEndAdorment = {
            ...params.InputProps.endAdornment,
            ["props"]: {
              ...params.InputProps.endAdornment.props,
              ["position"]: "start",
              ["children"]: {
                ...params.InputProps.endAdornment.props.children,
                ["props"]: {
                  ...params.InputProps.endAdornment.props.children.props,
                  ["edge"]: "start",
                },
              },
            },
          };
          const tempInputProps = {
            ...params.InputProps,
            ...InputProps,
            ["endAdornment"]: InputProps.endAdornment,
            ["startAdornment"]: tempEndAdorment,
          };
          return (
            <Controls.Input
              textFieldProps={{
                variant: "filled",
                id: "timeLimit",
                name: "timeLimit",
                autoComplete: "timeLimit",
                fullWidth: true,
                "aria-describedby": "component-error-text",
                ...params,
                ...otherTextFieldProps,
                error: Boolean(params.error || error),
                InputLabelProps: {
                  className: classes.inputLabelProps,
                },
                InputProps: tempInputProps,
                sx: {
                  "& .MuiInputBase-input": {
                    height: "40px",
                  },
                },
              }}
              formHelperTextProps={formHelperTextProps}
              error={error}
            />
          );
        }}
      />
    </LoacalizationProvider>
  );
};

const TimePicker = ({ timePickerProps, error }) => {
  return (
    <LoacalizationProvider>
      <TimePickerMui
        {...timePickerProps}
        renderInput={(params) => (
          <Controls.Input
            textFieldProps={{
              variant: "filled",
              id: "timeLimit",
              name: "timeLimit",
              autoComplete: "timeLimit",
              fullWidth: true,
              required: true,
              "aria-describedby": "component-error-text",
              ...params,
              error: params.error || error,
            }}
            formHelperTextProps={{
              id: "component-error-text",
              sx: {
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              },
            }}
            error={error}
          />
        )}
      />
    </LoacalizationProvider>
  );
};

export {
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
  DesktopTimePicker,
  TimePicker,
};

