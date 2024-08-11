import { FormControl, FormHelperText, Popper, TextField } from "@mui/material";
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

export const CustomStyledDatePicker = styled(({ theme, ...otherProps }) => (
  <Popper {...otherProps} />
))(({ theme }) => ({
  position: "fixed !important",
  top: "50% !important",
  left: "50% !important",
  transform: "translate(-50%, -50%) !important",
  zIndex: 1301,
  "& .MuiPickersPopper-paper": {
    position: "fixed !important",
    top: "50% !important",
    left: "50% !important",
    transform: "translate(-50%, -50%) !important",
    [theme.breakpoints.between(0, 350)]: {
      overflowX: "scroll",
      width: "98vw",
      maxWidth: "100vw",
    },
    backgroundColor: theme.palette.primary.pTeal["800"]["main"].value,
    "& .MuiPickersCalendarHeader-root": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      "& .MuiButtonBase-root": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      },
    },
    "& .css-1rtg91x-MuiDateCalendar-root": {
      height: "auto",
    },
    "& .css-2jurxj-MuiDayCalendar-slideTransition": {
      minHeight: "200px",
    },
    "& .MuiDayCalendar-header": {
      "& .MuiTypography-root": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      },
    },
    "& .css-1hzgflv-MuiButtonBase-root-MuiButton-root": {
      color: theme.palette.primary.pTeal100["light"],
      backgroundColor: theme.palette.primary.pTeal["700"]["main"].value,
      fontSize: 10,
      borderRadius: "100px",
      "&:hover": {
        backgroundColor: `${theme.palette.primary.pTeal["900"]["main"].value} !important`,
        fontWeight: "700",
      },
    },
    "& .MuiPickersArrowSwitcher-button": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      "&.Mui-disabled": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        opacity: 0.6,
      },
    },
    "& .MuiPickersDay-root": {
      fontWeight: "500",
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      "&:not(.Mui-selected)": {
        border: "5px",
        borderStyle: "ridge",
        borderColor: theme.palette.primary.pTeal800["dark"],
        "&:focus": {
          color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        },
      },
      "&.Mui-disabled": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        fontWeight: 500,
        opacity: 0.3,
      },
      "&:hover": {
        backgroundColor: `${theme.palette.primary.pTeal["900"]["main"].value} !important`,
        border: `3px dashed ${theme.palette.secondary.sDeepOrange["500"]["main"].value} !important`,
        fontWeight: "700",
      },
      "&.Mui-selected": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        border: `3px dashed ${theme.palette.secondary.sDeepOrange["500"]["main"].value} !important`,
        fontWeight: "700",
      },
    },
    "& .css-1qwb7qp-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      border: `1px solid white !important`,
    },
    "& .MuiPickersYear-root": {
      "& .MuiPickersYear-yearButton": {
        color: theme.palette.primary.pTeal100["light"],
        backgroundColor: theme.palette.primary.pTeal["700"]["main"].value,
        "&.Mui-selected": {
          fontWeight: "600",
          backgroundColor: theme.palette.primary.pTeal["800"]["dark"].value,
        },
        "&.Mui-disabled": {
          color: theme.palette.primary.pTeal["800"]["main"].contrastText,
          fontWeight: 400,
          opacity: 0.3,
        },
        "&:not(.Mui-selected)": {
          "&:hover": {
            color: theme.palette.primary.pTeal["800"]["main"].contrastText,
            backgroundColor: theme.palette.primary.pTeal["900"]["main"].value,
            border: "2px solid white",
          },
        },
      },
    },
    "& .MuiPickersMonth-root": {
      "& .MuiPickersMonth-monthButton": {
        color: theme.palette.primary.pTeal100["light"],
        backgroundColor: theme.palette.primary.pTeal["700"]["main"].value,
        "&.Mui-selected": {
          fontWeight: "600",
          backgroundColor: theme.palette.primary.pTeal["800"]["dark"].value,
        },
        "&.Mui-disabled": {
          color: theme.palette.primary.pTeal["800"]["main"].contrastText,
          fontWeight: 400,
          opacity: 0.3,
        },
        "&:not(.Mui-selected)": {
          "&:hover": {
            color: theme.palette.primary.pTeal["800"]["main"].contrastText,
            backgroundColor: theme.palette.primary.pTeal["900"]["main"].value,
            border: "2px solid white",
          },
        },
      },
    },
  },
}));

export const CustomStyledTimerPicker = styled(({ theme, ...otherProps }) => (
  <Popper {...otherProps} />
))(({ theme }) => ({
  zIndex: 1301,
  position: "fixed !important",
  top: "50% !important",
  left: "50% !important",
  transform: "translate(-50%, -50%) !important",
  "& .MuiPickersPopper-paper": {
    position: "fixed !important",
    top: "50% !important",
    left: "50% !important",
    transform: "translate(-50%, -50%) !important",
    [theme.breakpoints.between(0, 350)]: {
      overflowX: "scroll",
      width: "98vw",
      maxWidth: "100vw",
    },
    backgroundColor: theme.palette.primary.pTeal["800"]["main"].value,
    "& .css-1hzgflv-MuiButtonBase-root-MuiButton-root": {
      color: theme.palette.primary.pTeal100["light"],
      backgroundColor: theme.palette.primary.pTeal["700"]["main"].value,
      fontSize: 10,
      borderRadius: "100px",
      "&:hover": {
        backgroundColor: `${theme.palette.primary.pTeal["900"]["main"].value} !important`,
        fontWeight: "700",
      },
    },
    "& .MuiPickersArrowSwitcher-button": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      "&.Mui-disabled": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        opacity: 0.6,
      },
    },
    "& .MuiClock-clock": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      backgroundColor: `${theme.palette.primary.pTeal["800"]["dark"].value}`,
    },
    "& .MuiClockNumber-root": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      fontSize: 13,
      "&:not(.Mui-selected)": {
        border: "3px",
        borderStyle: "ridge",
        borderColor: theme.palette.primary.pTeal800["dark"],
      },
      "&.Mui-disabled": {
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        opacity: 0.3,
      },
      "&.Mui-selected": {
        position: "absolute",
        boxSizing: "content-box",
        color: theme.palette.primary.pTeal["800"]["main"].contrastText,
        border: `3px dashed ${theme.palette.secondary.sDeepOrange["500"]["main"].value}`,
        width: "30px",
        height: "30px",
        backgroundColor: theme.palette.primary.pTeal["800"]["main"].value,
        fontWeight: 700,
      },
    },

    "& .css-1sqz699-MuiClockNumber-root": {
      fontSize: 12,
    },

    "& .MuiClock-pin": {
      backgroundColor: theme.palette.secondary.sDeepOrange["500"]["main"].value,
    },
    "& .MuiClockPointer-root": {
      backgroundColor: theme.palette.secondary.sDeepOrange["500"]["main"].value,
    },
    "& .MuiClockPointer-thumb": {
      color: theme.palette.primary.pTeal["800"]["main"].contrastText,
      border: `3px dashed ${theme.palette.secondary.sDeepOrange["500"]["main"].value}`,
      width: "30px",
      height: "30px",
      backgroundColor: theme.palette.primary.pTeal["800"]["main"].value,
    },
  },
}));
