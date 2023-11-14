import { styled } from "@mui/material/styles";
import { Form } from "../../../../hooks/useForm";

export const AchievementsSyled = styled(Form)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.tertiary.contrastTextMain,
  boxShadow: theme.shadows[10],
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.between("xs", "sm")]: {
    width: "60%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "60%",
  },
  rowGap: theme.spacing(1),
}));
