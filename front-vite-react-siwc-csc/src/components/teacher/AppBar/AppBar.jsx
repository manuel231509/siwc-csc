import { Logout, Menu as MenuIcon, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Image } from "mui-image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import shield_csc_image_without_background from "../../../assets/images/shield_csc_image_without_background.png";
import { useTeacherContext } from "../../../context/Teacher/TeacherProvider";
import { resetSession } from "../../../redux/states/ssessionSlice";

let drawerWidth = 0;
const AppBarMui = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.light["value"],
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    [theme.breakpoints.down("md")]: {
      zIndex: theme.zIndex.drawer + 0,
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name
      .split(" ")
      .map((c, i, v) => v[i][0])
      .join(""),
  };
};

const AppBar = () => {
  const { open, handleDrawerOpen, drawer_width } = useTeacherContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ssessionState = useSelector((store) => store.ssession);
  const { session } = ssessionState;
  const { teacher } = session;

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseMenuLogout = () => {
    dispatch(resetSession());
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    drawerWidth = drawer_width;
  }, [drawer_width]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Image
                src={shield_csc_image_without_background}
                width={80}
                sx={{
                  mt: 0.5,
                  mb: 0.9,
                  mr: 3,
                  ml: 1,
                  display: { xs: "none", sm: "flex", md: "flex" },
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  ml: 2.5,
                  mt: 0.7,
                  display: { xs: "none", sm: "flex", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  fontSize: { sm: "0.85rem", md: "1.7vw" },
                  alignItems: "center",
                }}
              >
                COLEGIO SANTA CECILIA
              </Typography>
            </Grid>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Search /> */}
          <Box sx={{ display: { xs: "flex", sm: "flex", md: "flex" } }}>
            <Tooltip title="Account Settings">
              <IconButton
                onClick={handleClickMenu}
                size="medium"
                sx={{ ml: 3, mt: 0.4 }}
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
              >
                <Avatar
                  {...stringAvatar(
                    `${teacher.fullNamesTeacher.split(" ")[0]} ${
                      teacher.fullSurNamesTeacher.split(" ")[0]
                    }`
                  )}
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
              PaperProps={{
                elevation: 5,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  //mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    backgroundColor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleCloseMenuLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBarMui>
      {/* <Chatbot context={useTeacherContext} /> */}
    </Box>
  );
};
export default AppBar;
