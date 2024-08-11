import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useTheme,
} from "@mui/material";

import CollapseAchievements from "./Collapse Achievements/CollapseAchievements";
import { useTeacherContext } from "../../../../../context/Teacher/TeacherProvider";

const MainAchievements = () => {
  const theme = useTheme();
  const { openMainAchievements, handleClickOpenMainAchievements } =
    useTeacherContext();

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 5,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography
            variant="subtitle5"
            fontWeight={800}
            letterSpacing={".17rem"}
          >
            MAIN ACHIEVEMENTS
          </Typography>
        </ListSubheader>
      }
    >
      <ListItemButton
        onClick={handleClickOpenMainAchievements}
        sx={{
          pl: 3,
          borderTop: "1px solid #E0E0E0",
          borderBottom: "1px solid #E0E0E0",
          mb: 0.4,
          ...(openMainAchievements
            ? {
                mb: 0.5,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary["contrastTextMain"],
                boxShadow: theme.shadows[2],
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }
            : {
                "&:hover": {
                  backgroundColor:
                    theme.palette.primary["pTeal"]["800"]["main"]["value"],
                  color:
                    theme.palette.primary["pTeal"]["800"]["main"][
                      "contrastText"
                    ],
                  boxShadow: theme.shadows[6],
                },
              }),
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon={faTrophy}
            fontSize={18}
            color={
              openMainAchievements
                ? theme.palette.primary["contrastTextMain"]
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="IS VERY GOOD" />
        {openMainAchievements ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapseAchievements />
    </List>
  );
};
export default MainAchievements;
