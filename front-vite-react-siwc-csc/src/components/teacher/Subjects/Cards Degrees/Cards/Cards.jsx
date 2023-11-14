import { Card as CardMui } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { CardContent } from "@mui/material";

import { Pagination } from "@mui/material";
import { CardHeader } from "@mui/material";
import { useState } from "react";
import Card from "../Card/Card";

const Cards = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <CardMui elevation={7} square>
      <CardHeader
        style={{ textAlign: "center" }}
        title={
          <Typography
            variant="subtitle2"
            fontWeight={600}
            letterSpacing=".17rem"
          >
            GRADE SIXTH
          </Typography>
        }
      />
      <CardContent>
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={12} p={4}>
            <Typography>Page: {page}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              spacing={{ xs: 1, sm: 2, md: 5, lg: 4 }}
            >
              <Card />
              <Card />
              <Card />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </CardActions>
    </CardMui>
  );
};
export default Cards;
