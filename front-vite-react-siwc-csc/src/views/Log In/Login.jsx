import { Box, CssBaseline, Grid, Paper } from "@mui/material";
import { useTheme as theme } from "@mui/material/styles";
import CopyRight from "../../components/copy right/CopyRight";
import LoginForm from "../../components/log in/LoginForm";
import { useStyles } from "../../components/log in/Styles/loginStyle";
import useWindowSize from "../../hooks/useWindowSize";
import {
  GridImageStyled,
  GridRootStyled,
} from "../../components/log in/Styled/LoginStyled";

const gridContainerRootSX = () => {
  const { width } = useWindowSize();
  const tGreen50 = theme().palette.tertiary.tGreen50;

  return {
    padding: width <= 400 ? 1.5 : 3,
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    bgcolor: tGreen50["main"],
  };
};

const Login = () => {
  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <GridRootStyled container component="main" sx={gridContainerRootSX}>
        <CssBaseline />
        <GridImageStyled
          item
          xs={false}
          sm={false}
          md={6}
          component={Paper}
          elevation={7}
          square
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          container
          elevation={7}
          square
        >
          <LoginForm />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ mt: -1, mb: 1, mx: 4 }}
            component={Box}
          >
            <CopyRight variant="body2" color="text.secondary" align="center" />
          </Grid>
        </Grid>
      </GridRootStyled>
    </Grid>
  );
};

export default Login;
