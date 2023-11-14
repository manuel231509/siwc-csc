import { makeStyles } from "@mui/styles";
import { useTheme as theme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  submitBtn: {
    backgroundColor: theme().palette.secondary.main,
    color: theme().palette.secondary["contrastTextMain"],
    "&:hover": {
      backgroundColor:
        theme().palette.secondary.sDeepOrange["500"]["dark"]["value"],
    },
  },
}));

export { useStyles };
