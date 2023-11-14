import { Typography, Grid, Paper } from "@mui/material";
import { useStyles } from "./Styles/NotFoundStyles";
import Image from "mui-image";
import sad from "../../assets/images/sad.png";

const tallGrid = {
  height: "100vh",
};

const NotFound = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.gridStyles}
      sx={{ ...tallGrid }}
    >
      <Typography
        variant="h1"
        component="div"
        display="flex"
        sx={{
          fontWeight: 800,
          fontSize: "13vw",
          letterSpacing: ".2rem",
          textDecoration: "none",
          textShadow: "2px 2px 15px black",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h1"
        component="div"
        display="flex"
        textAlign={"center"}
        sx={{
          fontWeight: 800,
          fontSize: "7vw",
          letterSpacing: ".2rem",
          textDecoration: "none",
          textShadow: "1px 1px 15px black",
        }}
      >
        NOT FOUND PAGE
        <br />
      </Typography>
      <Grid mt={3} item>
        <Image src={sad} width={150} />
      </Grid>
    </Grid>
  );
};
export default NotFound;
