import { Circle as CircleIcon } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useTeacherContext } from "../../../../../../context/Teacher/TeacherProvider";

const CollapseAchievements = () => {
  const { openMainAchievements } = useTeacherContext();
  return (
    <Collapse in={openMainAchievements} timeout="auto" unmountOnExit>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            sx={{ pl: 4, textAlign: "left" }}
            id="nested-list-subheader"
          >
            <Typography
              variant="subtitle5"
              fontWeight={800}
              letterSpacing={".17rem"}
            >
              IT IS DIFFICULT FOR HIM TO LEARN
            </Typography>
          </ListSubheader>
        }
        disablePadding
      >
        <ListItem sx={{ pl: 6 }}>
          <ListItemIcon>
            <CircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
      </List>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            sx={{ pl: 4, textAlign: "left" }}
            id="nested-list-subheader"
          >
            <Typography
              variant="subtitle5"
              fontWeight={800}
              letterSpacing={".17rem"}
            >
              IT IS RECOMMENDED TO LEARN
            </Typography>
          </ListSubheader>
        }
        disablePadding
      >
        <ListItem sx={{ pl: 6 }}>
          <ListItemIcon>
            <CircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="subtitle5"
                fontWeight={400}
                letterSpacing={".15rem"}
              >
                Lorem ipsum dolor sit amet.
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ pl: 6 }}>
          <ListItemIcon>
            <CircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="subtitle5"
                fontWeight={400}
                letterSpacing={".15rem"}
              >
                Lorem ipsum dolor sit amet.
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Collapse>
  );
};
export default CollapseAchievements;
