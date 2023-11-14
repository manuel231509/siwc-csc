import { useTheme } from "@emotion/react";
import {
  Dashboard as DashBoardIcon
} from "@mui/icons-material";
import {
  Divider, Grid, List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import Image from "mui-image";
import React from "react";
import { NavLink } from "react-router-dom";
import books_stack_of_three2_3 from "../../../assets/images/books_stack_of_three2_3.png";
import tasks from "../../../assets/images/tasks_2.png";
import rating from "../../../assets/images/grade.png";
import { useStudentContext } from "../../../context/Student/StudentProvider";

const dataList = [
  {
    icon: <Image src={books_stack_of_three2_3} width={27} />,
    label: "SUBJECTS",
    router: "list/subjects",
  },
  {
    icon: <Image src={tasks} width={23} />,
    label: "TASKS",
    router: "list/tasks",
  },
  {
    icon: <Image src={rating} width={31} />,
    label: "RAITINGS",
    router: "list/ratings",
  },
];

const DrawerContent = () => {
  const theme = useTheme();
  const { open, handleDrawerClose } = useStudentContext();
  
  return (
    <Grid flex>
      <Divider
        sx={{
          bgcolor: (theme) => theme.palette.primary["contrastTextLight"],
        }}
      />
      <List
        sx={{
          mt: "15px",
          padding: "6px",
        }}
      >
        {dataList.map((data, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={handleDrawerClose}
          >
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "0.5rem 0",
                  textDecoration: "none",
                  backgroundColor: isActive && theme.palette.secondary.light,
                };
              }}
              to={data.router}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minwidth: 0,
                    fontSize: ".4rem",
                    mr: open ? 1.5 : "auto",
                    justifyContent: "center",
                    color: (theme) =>
                      theme.palette.primary["contrastTextLight"],
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText
                  primary={data.label}
                  primaryTypographyProps={{
                    fontSize: ".85rem",
                    fontWeight: 600,
                    letterSpacing: ".15rem",
                    textDecoration: "none",
                    color: (theme) =>
                      theme.palette.primary["contrastTextLight"],
                  }}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default DrawerContent;
