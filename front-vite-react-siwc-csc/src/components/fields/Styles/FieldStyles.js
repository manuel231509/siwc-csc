import { makeStyles } from "@mui/styles";
import { useTheme as theme } from "@mui/material";

const useStyleField = makeStyles(() => ({
  fieldTitle: {
    [theme().breakpoints.between(0, 500)]: {
      fontSize: 12,
    },
  },
  fieldInstructions: {
    [theme().breakpoints.between(0, 500)]: {
      fontSize: 12,
    },
  },
  fieldComment: {
    [theme().breakpoints.between(0, 500)]: {
      fontSize: 12,
    },
  },
  fieldQualificationNote: {
    [theme().breakpoints.between(0, 500)]: {
      fontSize: 12,
    },
  },
}));

export default useStyleField;
