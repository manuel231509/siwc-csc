import { useTheme as theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  form: {
    padding: theme().spacing(2),
    backgroundColor: theme().palette.tertiary.contrastTextMain,
    boxShadow: theme().shadows[10],
    marginTop: theme().spacing(1),
    display: "flex",
    flexDirection: "column",
    [theme().breakpoints.between("xs", "sm")]: {
      width: "80%",
    },
    [theme().breakpoints.up("sm")]: {
      width: "60%",
    },
    rowGap: theme().spacing(1),
  },
  submitBtn: {
    height: "auto",
    backgroundColor: theme().palette.secondary.main,
    color: "white",
    "&:hover": {
      backgroundColor:
        theme().palette.secondary.sDeepOrange["500"]["dark"]["value"],
    },
  },
}));

export { useStyles };
