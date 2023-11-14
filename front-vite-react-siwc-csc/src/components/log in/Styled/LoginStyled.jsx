import { LoadingButton } from "@mui/lab";
import { Avatar, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form } from "../../../hooks/useForm";

export const GridRootStyled = styled(Grid)({
  height: "100%",
});

export const GridImageStyled = styled(Grid)({
  backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/siwc-csc.appspot.com/o/Sebastian%20Villamizar%2FIMAGES%2FCOLSACE2.png?alt=media&token=831e09fb-c5e2-4941-8f6a-6a453901cb40)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const FormStyled = styled(Form)(({ theme }) => ({
  width: "80%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

export const GridPaperStyled = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 4),
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  justifyItems: "center",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    border: "2px solid #e0e0e0",
    boxShadow: "2px 2px 9px 0.2px black",
  },
  [theme.breakpoints.down("md")]: {
    margin: theme.spacing(2, 2),
  },
}));

export const AvatarStyled = styled(Avatar)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

export const LoadingButtonStyled = styled(LoadingButton)(({ theme }) => ({
  height: "auto",
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  "&:hover": {
    backgroundColor:
      theme.palette.secondary.sDeepOrange["500"]["dark"]["value"],
  },
}));
