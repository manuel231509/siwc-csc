import { Drawer as MuiDrawer, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { lazy, useEffect } from "react";
import { useTeacherContext } from "../../../context/Teacher/TeacherProvider";

const DrawerContent = lazy(() => import("./DrawerContent"));
const DrawerHeader = lazy(() => import("./DrawerHeader"));

let drawerWidth = 0;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastTextLight,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastTextLight,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MiniDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  color: theme.palette.primary["contrastTextLight"],
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Drawer = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { open, handleDrawerOpen, drawer_width } = useTeacherContext();

  useEffect(() => {
    drawerWidth = drawer_width;
  }, [drawer_width]);

  return !isMdUp ? (
    <MuiDrawer
      variant="temporary"
      open={open}
      onClose={handleDrawerOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "flex", sm: "flex", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary["contrastTextLight"],
        },
      }}
    >
      {open && <DrawerHeader />}
      {open && <DrawerContent />}
    </MuiDrawer>
  ) : (
    <MiniDrawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
      open={open}
    >
      <DrawerHeader />
      <DrawerContent />
    </MiniDrawer>
  );
};
export default Drawer;
