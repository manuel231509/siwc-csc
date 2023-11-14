import { Close } from "@mui/icons-material";
import { CardHeader, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary["main"],
}));

export const IconButtonCloseStyled = styled(IconButton)(({ theme }) => ({
  position: "relative",
  transition: "0.5s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary["light"],
    transform: "rotate(90deg)",
  },
}));

export const IconCloseStyled = styled(Close)(({ theme }) => ({
  color: theme.palette.primary["contrastTextMain"],
}));
