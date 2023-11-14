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

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  position: "relative",
  transition: "0.5s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary["light"],
    transform: "rotate(90deg)",
  },
}));
