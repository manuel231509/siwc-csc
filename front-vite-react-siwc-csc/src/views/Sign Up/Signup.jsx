import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import shield_csc from "../../assets/images/shield_csc.png";
import CopyRight from "../../components/copy right/CopyRight";
import SignupForm from "../../components/sign up/SignupForm";
import useWindowSize from "../../hooks/useWindowSize";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  paper: {
    margin: useTheme().spacing(2, 4.5),
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    justifyItems: "center",
    alignItems: "center",
  },
  avatar: {
    marginTop: useTheme().spacing(1),
    marginBottom: useTheme().spacing(1.5),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const windowSize = useWindowSize();
  console.log(windowSize);
  const tGreen50 = theme.palette.tertiary.tGreen50;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid
        container
        component="main"
        className={classes.root}
        sx={{
          padding: windowSize.width <= 400 ? 1.5 : 3,
          backgroundColor: tGreen50["main"],

          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          xl={7}
          sx={{
            width: "100%",
          }}
          component={Paper}
          elevation={8}
          square
        >
          <div className={classes.paper}>
            <Avatar
              variant="outlined"
              className={classes.avatar}
              src={shield_csc}
              sx={{
                width: 150,
                height: 150,
              }}
            />

            <Typography component="h1" variant="h5" fontWeight={600}>
              SIGN UP
            </Typography>
            <SignupForm />
          </div>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mb: 1.3, mx: 4 }}
            component={Box}
          >
            <CopyRight variant="body2" color="text.secondary" align="center" />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
