import { styled, alpha, useTheme } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTeacherContext } from "../../../context/Teacher/TeacherProvider";

const SearchMui = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    // backgroundColor: "red",
  },
  // [theme.breakpoints.down("md")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  //   backgroundColor: "blue",
  // },
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
    // backgroundColor: "blue",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    [theme.breakpoints.up("md")]: {
      // width: "18vw",
      "&:focus": {
        width: "30vw",
        // backgroundColor: "purple",
      },
    },
    [theme.breakpoints.only("sm")]: {
      // width: "100%",
      "&:focus": {
        width: "30vw",
        // backgroundColor: "green",
      },
    },
  },
}));

const Search = () => {
  const { open } = useTeacherContext();
  const theme = useTheme();
  return (
    <SearchMui
      sx={{
        mt: { xs: "2px" },
        mb: { xs: "2px" },
        ...(open && {
          width: { sm: "100%", md: "100%" },
        }),
        width: { xs: "40vw", sm: "30vw", md: "30vw" },
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        sx={{
          ...(open && {
            width: { sm: "100%", md: "100%" },
          }),
          width: { xs: "38vw", sm: "27vw", md: "28.6vw" },
        }}
      />
    </SearchMui>
  );
};

export default Search;
