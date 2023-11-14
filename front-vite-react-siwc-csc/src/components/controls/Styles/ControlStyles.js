import { useTheme as theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  fontWeightLabelText: {
    fontWeight: 800,
    "& label": {
      fontWeight: 500,
      "&.Mui-focused": {
        fontWeight: 700,
      },
    },
  },
  inputLabelProps: {
    [theme().breakpoints.between(0, 500)]: {
      fontSize: 12,
    },
  },
  desktopDatePicker: {
    position: "fixed !important",
    top: "50% !important",
    left: "50% !important",
    transform: "translate(-50%, -50%) !important",
    "& .css-1anqmj6-MuiPopper-root-MuiPickersPopper-root": {
      position: " absolute",
      inset: " 291px auto 0px 0px",
      margin: " 0px",
      transform: " translate(349px, -216px)",
    },
    "& .css-epd502": {
      backgroundColor: "red",
      [theme().breakpoints.between(0, 281)]: {
        overflowX: "scroll",
        width: "98vw",
        maxWidth: "100vw",
      },
    },
    "& .MuiCalendarPicker-root": {
      backgroundColor: theme().palette.primary.pTeal["800"]["main"].value,
      "& .MuiPickersCalendarHeader-root": {
        color: theme().palette.primary.pTeal["800"]["main"].contrastText,
        "& .MuiButtonBase-root": {
          color: theme().palette.primary.pTeal["800"]["main"].contrastText,
        },
      },
      "& .MuiDayPicker-header": {
        "& .MuiTypography-root": {
          color: theme().palette.primary.pTeal["800"]["main"].contrastText,
          opacity: 0.6,
        },
      },
      "& .css-1ae9t7h-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button.Mui-disabled":
        {
          color: theme().palette.primary.pTeal["800"]["main"].contrastText,
          opacity: 0.6,
        },
      "& .MuiPickersDay-root": {
        fontWeight: "700",
        "&:hover": {
          color: theme().palette.primary.pTeal["800"]["main"].contrastText,
          border: "2px solid white",
        },
      },
      "& .css-1mghjd5-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
        border: "2px dashed white",
      },
      "& .css-1n0c6ly-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
        {
          color: theme().palette.primary["dark"],
          border: "5px",
          borderStyle: "ridge",
          borderColor: theme().palette.primary.pTeal800["dark"],
          "&:focus": {
            color: theme().palette.primary.pTeal["800"]["main"].contrastText,
          },
        },

      "& .css-1n0c6ly-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
        border: "2px dashed white",
      },

      "& .PrivatePickersYear-root": {
        color: theme().palette.primary.pTeal100["light"],
        "& .css-kghedm-PrivatePickersYear-button.Mui-selected": {
          fontWeight: "700",
        },
        "& .css-kghedm-PrivatePickersYear-button.Mui-disabled": {
          color: "rgb(255 255 255 / 37%)",
        },
      },
    },
  },
}));

export { useStyles };

