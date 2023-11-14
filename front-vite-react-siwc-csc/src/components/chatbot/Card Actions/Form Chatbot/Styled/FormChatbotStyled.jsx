import { styled } from "@mui/material/styles";
import { Form } from "../../../../../hooks/useForm";

export const FormChatbootStyled = styled(Form)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  display: "flex",
  flexDirection: "rows",
  columnGap: theme.spacing(1),
  rowGap: theme.spacing(1),
}));
