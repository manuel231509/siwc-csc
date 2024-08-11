import { styled } from "@mui/material/styles";
import { Form } from "../../../../../../../../hooks/useForm";

export const FormStyled = styled(Form)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.tertiary.contrastTextMain,
  boxShadow: theme.shadows[10],
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
  },
  rowGap: theme.spacing(1),
}));
