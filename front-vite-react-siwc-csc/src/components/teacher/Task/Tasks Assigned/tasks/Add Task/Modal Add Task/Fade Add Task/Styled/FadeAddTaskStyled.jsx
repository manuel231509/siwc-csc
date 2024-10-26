import { Fade, Grid, IconButton, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@mui/system";

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

export const GridContainerFadeAddTask = styled(
  ({ children, theme, height, ...otherProps }) => (
    <Grid {...otherProps}>{children}</Grid>
  )
)(({ theme, height }) => ({
  flexGrow: 1,
  padding: theme.spacing(1.7),
  // width: { xs: "89.4vw", sm: "89.6vw", md: "79.7vw", lg: "79.8vw" },
  // ...(height > 0 && height < 400 && { height: "65vh" }),
  // ...(height > 400 && height <= 600 && { height: "75vh" }),
  // borderBottom: "2.9px solid #000000",
  boxShadow: theme.shadows[20],
  // maxWidth: "98vw",
  // height: height - 78,
  height: height < 600 ? height - 82 : "85vh",
  maxHeight: "90%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "7px" /* Ancho del scroll */,
  },
  "&::-webkit-scrollbar-track": {
    background: "#eaf1ea" /* Color del fondo del track del scroll */,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#39796b" /* Color de la barra de desplazamiento */,
    borderRadius: "50px" /* Borde redondeado */,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background:
      "#006b5a" /* Color de la barra de desplazamiento al pasar el ratón */,
  },
  scrollbarWidth: "thin" /* Grosor del scroll */,
  scrollbarColor:
    "#39796b #eaf1ea" /* Color de la barra de desplazamiento y del track */,
  backgroundColor: theme.palette.background.paper,
}));
