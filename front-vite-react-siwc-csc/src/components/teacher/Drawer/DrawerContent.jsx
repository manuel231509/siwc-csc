import {
  CalendarMonth as CalendarIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "mui-image";
import { NavLink } from "react-router-dom";
import add_jobs from "../../../assets/images/add_jobs.png";
import reportCard from "../../../assets/images/boletin-informativo.png";
import rating from "../../../assets/images/rating.png";
import students2 from "../../../assets/images/students2.png";
import { useTeacherContext } from "../../../context/Teacher/TeacherProvider";

const dataList = [
  // { icon: <DashBoardIcon />, label: "DASHBOARD", router: "dashboard" },
  {
    icon: (
      <Image
        src={students2}
        alt={"students"}
        width={27}
        height={"auto"}
        fit={"cover"}
        duration={1000}
        easing={"ease-in-out"}
        showLoading={true}
        errorIcon={true}
        shift={"bottom"}
        distance={"100px"}
        shiftDuration={500}
      />
    ),
    label: "STUDENTS",
    router: "list/students",
  },
  // {
  //   icon: <Image src={books_stack_of_three2} width={26} />,
  //   label: "SUBJECTS",
  //   router: "subjects",
  // },
  {
    icon: (
      <Image
        src={add_jobs}
        alt={"add_jobs"}
        width={27}
        height={"auto"}
        fit={"cover"}
        duration={1000}
        easing={"ease-in-out"}
        showLoading={true}
        errorIcon={true}
        shift={"bottom"}
        distance={"100px"}
        shiftDuration={500}
      />
    ),
    label: "ADD TASK",
    router: "task",
  },
  {
    icon: (
      <Image
        src={rating}
        width={27.5}
        height={"auto"}
        fit={"cover"}
        duration={1000}
        easing={"ease-in-out"}
        showLoading={true}
        errorIcon={true}
        shift={"bottom"}
        distance={"100px"}
        shiftDuration={500}
      />
    ),
    label: "RATINGS",
    router: "ratings",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 27.5 }} />,
    label: "ACHIEVEMENTS",
    router: "achievements",
  },
  {
    icon: (
      <Image
        src={reportCard}
        width={23}
        height={"auto"}
        fit={"cover"}
        duration={1000}
        easing={"ease-in-out"}
        showLoading={true}
        errorIcon={true}
        shift={"bottom"}
        distance={"100px"}
        shiftDuration={500}
      />
    ),
    label: "REPORT CARD",
    router: "report-card",
  },
  { icon: <CalendarIcon />, label: "CALENDAR", router: "calendar" },
];

const DrawerContent = () => {
  const theme = useTheme();
  const { open, handleDrawerClose } = useTeacherContext();
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
              style={({ isActive, isTransitioning }) => {
                return {
                  display: "block",
                  margin: "0.5rem 0",
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "",
                  backgroundColor: isActive && theme.palette.secondary["light"],
                  viewTransitionName: isTransitioning ? "slide" : "",
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
