import { makeStyles } from "@mui/styles";
import {useTheme} from "@mui/material/styles"

const useStyles = makeStyles(() => ({
  gridStyles: {
    background: `linear-gradient(45deg, ${useTheme().palette.primary.dark} 35%, ${useTheme().palette.secondary.light} 95%)`,
    backgroundAttachment: "fixed",
    color: useTheme().palette.primary["contrastTextMain"],
  },
}));

export { useStyles };
