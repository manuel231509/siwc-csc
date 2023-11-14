import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBadgeStyled = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    left: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
