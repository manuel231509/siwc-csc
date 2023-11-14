import { Link } from "@mui/material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CopyRight = (props) => {
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary;
  return (
    <Typography {...props}>
      {"Copyright © "}
      {" | "}
      <Link
        color="inherit"
        href="https://colsaceweb.wixsite.com/colsaceweb"
        underline="hover"
        sx={{
          "&:hover":{
            color: sDeepOrange["main"],
          }
        }}
      >
        SANTA CECILIA SCHOOL
      </Link>
      {" | "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyRight;
