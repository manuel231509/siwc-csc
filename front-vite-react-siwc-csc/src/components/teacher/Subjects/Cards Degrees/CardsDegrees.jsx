import { Grid } from "@mui/material";
import Cards from "./Cards/Cards";

const CardsDegrees = () => {
  
  return (
    <Grid container mt={1} mb={1} justifyContent="center">
      <Grid item xs={11.8} alignContent="center" alignSelf={"center"}>
        <Cards />
      </Grid>
    </Grid>
  );
};
export default CardsDegrees;
