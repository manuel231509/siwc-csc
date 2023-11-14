import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  position: "relative",
  transition: "0.5s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary["light"],
    transform: "rotate(90deg)",
  },
}));

export {IconButtonStyled}
