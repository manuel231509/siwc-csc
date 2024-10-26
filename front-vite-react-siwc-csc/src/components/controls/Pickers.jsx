import { Error as ErrorIcon } from "@mui/icons-material";
import {
  DatePicker as DatePickerMui,
  DesktopDatePicker as DesktopDatePickerMui,
  DesktopTimePicker as DesktopTimePickerMui,
  LocalizationProvider as LocalizationProviderMui,
  MobileDatePicker as MobileDatePickerMui,
  renderTimeViewClock,
  TimePicker as TimePickerMui,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import { forwardRef } from "react";
import { SuspenseProgressSkeleton } from "../SuspenseProgress/SusProg";
import Controls from "./Controls";
import {
  CustomStyledDatePicker,
  CustomStyledTimerPicker,
  FormHelperTextStyled,
} from "./Styled/ControlStyled";

const LoacalizationProvider = ({ children }) => {
  return (
    <LocalizationProviderMui dateAdapter={AdapterDayjs} adapterLocale={"es"}>
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

const TextFieldForwardRef = forwardRef((props, ref) => {
  const { otherTextFieldProps, error, ...otherProps } = props;
  return (
    <Controls.Input
      textFieldProps={{
        variant: "filled",
        id: "deadline",
        name: "deadline",
        autoComplete: "deadline",
        autoFocus: false,
        fullWidth: true,
        "aria-describedby": "component-error-text",
        ...ref,
        ...otherTextFieldProps,
        ...otherProps,
        error: Boolean(error),
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
});

const DesktopDatePicker = ({
  desktopDatePickerProps,
  error,
  formHelperTextProps,
  otherTextFieldProps,
}) => {
  const { slotPropsTextField, ...propsTextField } = otherTextFieldProps;
  return (
    <LoacalizationProvider>
      <DesktopDatePickerMui
        {...desktopDatePickerProps}
        slots={{
          popper: { ...CustomStyledDatePicker },
        }}
        slotProps={{
          textField: { ...slotPropsTextField },
          actionBar: { actions: ["today", "clear", "cancel"] },
        }}
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
  error,
  formHelperTextProps,
}) => {
  const { slotPropsTextField, ...propsTextField } = otherTextFieldProps;
  return (
    <LoacalizationProvider>
      <DesktopTimePickerMui
        {...desktopTimePickerProps}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        slots={{
          popper: CustomStyledTimerPicker,
        }}
        slotProps={{
          textField: { ...slotPropsTextField },
        }}
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
  DesktopTimePicker,
  MobileDatePicker,
  TimePicker,
};
