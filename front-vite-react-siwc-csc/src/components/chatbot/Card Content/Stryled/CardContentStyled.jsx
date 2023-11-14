import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const styleCommonGrid = {
  width: "fit-content",
  marginTop: "10px",
  padding: "8px 12px",
  maxWidth: "95%",
};

const stylesCommonTypography = {
  variant: "subtitle2",
  letterSpacing: ".09rem",
};

export const GridYouStyled = styled(({ children, text, ...props }) => (
  <Grid {...props}>
    <Typography {...stylesCommonTypography}>{text}</Typography>
  </Grid>
))({
  ...styleCommonGrid,
  marginLeft: "auto",
  background: "#546e7a",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "35px",
  borderBottomLeftRadius: "20px",
  color: "white",
  wordBreak: "break-all",
});

export const GridChatBotStyled = styled(({ children, text, ...props }) => (
  <Grid container {...props}>
    {text && <Typography {...stylesCommonTypography}>{text}</Typography>}
    {!text && children}
  </Grid>
))({
  ...styleCommonGrid,
  marginRight: "auto",
  background: "#E0E0E0",
  borderTopLeftRadius: "35px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  wordBreak: "break-all",
});
