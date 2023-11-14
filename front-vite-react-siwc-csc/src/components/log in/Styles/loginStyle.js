import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: useTheme().spacing(2, 4),
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    justifyItems: "center",
    alignItems: "center",
    width: "100%",
    [useTheme().breakpoints.up("xs")]: {
      border: "2px solid #e0e0e0",
      boxShadow: "2px 2px 9px 0.2px black",
    },
    [useTheme().breakpoints.down("md")]: {
      margin: useTheme().spacing(2, 2),
    },
  },
  avatar: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(1.5),
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: useTheme().spacing(1),
  },
  submitBtn: {
    height: "auto",
    backgroundColor: useTheme().palette.secondary.main,
    color: "white",
    "&:hover": {
      backgroundColor:
        useTheme().palette.secondary.sDeepOrange["500"]["dark"]["value"],
    },
  },
}));

export { useStyles };
