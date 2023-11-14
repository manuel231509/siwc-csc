import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  fade: {
    [useTheme().breakpoints.down("md")]: {
      width: "98%",
    },
    [useTheme().breakpoints.up("md")]: {
      width: "88%",
    },
    height: "97%",
  },
  close: {
    position: "relative",
    transition: "0.5s ease",
    "&:hover": {
      backgroundColor: useTheme().palette.primary["light"],
      transform: "rotate(90deg)",
    },
  },
  form: {
    [useTheme().breakpoints.down("md")]: {
      width: "90vw",
    },
  },
}));

export default useStyles;
