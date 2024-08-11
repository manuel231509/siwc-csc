import { Fade, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FadeStyled = styled(Fade)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
  [theme.breakpoints.up("md")]: {
    width: "80%",
  },
  maxHeight: "96%",
}));

export const IconButtonStyled = styled(
  ({ shades = "light", ...otherProps }) => <IconButton {...otherProps} />
)(({ theme, shades = "light" }) => ({
  position: "relative",
  transition: "0.5s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary[shades],
    transform: "rotate(180deg)",
  },
}));
