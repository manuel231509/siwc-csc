import { Delete, Edit, MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTeacherContext } from "../../../../../context/Teacher/TeacherProvider";
import useWindowSize from "../../../../../hooks/useWindowSize";
import TaskDetailsAccordion from "./Task Details/TaskDetailsAccordion";

const cardMuiStyle = () => {
  const windowSize = useWindowSize();
  const { open } = useTeacherContext();
  return {
    width:
      windowSize.width >= "0" && windowSize.width <= "899"
        ? "100%"
        : windowSize.width >= "900" && windowSize.width <= "920"
        ? !open
          ? "38rem"
          : "29rem"
        : windowSize.width >= "921" && windowSize.width <= "955"
        ? !open
          ? "42rem"
          : "32rem"
        : windowSize.width >= "956" && windowSize.width <= "999"
        ? !open
          ? "45rem"
          : "33rem"
        : windowSize.width >= "1000" && windowSize.width <= "1050"
        ? !open
          ? "47rem"
          : "36rem"
        : windowSize.width >= "1051" && windowSize.width <= "1100"
        ? !open
          ? "49rem"
          : "38.8rem"
        : windowSize.width >= "1101" && windowSize.width <= "1150"
        ? !open
          ? "25rem"
          : "42rem"
        : windowSize.width >= "1151" && windowSize.width <= "1200"
        ? !open
          ? "27.2rem"
          : "21.5rem"
        : windowSize.width >= "1201" && windowSize.width <= "1250"
        ? !open
          ? "28.8rem"
          : "22.5rem"
        : windowSize.width >= "1251" && windowSize.width <= "1300"
        ? !open
          ? "30rem"
          : "24.5rem"
        : windowSize.width >= "1301" && windowSize.width <= "1350"
        ? !open
          ? "31rem"
          : "25.7rem"
        : windowSize.width >= "1351" && windowSize.width <= "1400"
        ? !open
          ? "33rem"
          : "27.5rem"
        : windowSize.width >= "1401" && windowSize.width <= "1450"
        ? !open
          ? "35rem"
          : "29.5rem"
        : windowSize.width >= "1451" && windowSize.width <= "1500"
        ? !open
          ? "23.3rem"
          : "19.5rem"
        : windowSize.width >= "1501" && windowSize.width <= "1550"
        ? !open
          ? "24.3rem"
          : "27.5rem"
        : windowSize.width >= "1551" && windowSize.width <= "1600"
        ? !open
          ? "25rem"
          : "28.5rem"
        : windowSize.width >= "1601" && windowSize.width <= "1650"
        ? !open
          ? "26.2rem"
          : "22rem"
        : !open
        ? "28rem"
        : "23.5rem",
    bgcolor: "grey",
  };
};

const ITEM_HEIGHT = 50;

const menuOptions = [
  { itemText: "EDIT", itemIcon: <Edit /> },
  { itemText: "DELETE", itemIcon: <Delete /> },
];

const TaskCard = ({ periodPlan }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickAnchorEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchorEl = () => {
    setAnchorEl(null);
  };
  return (
    <Grid
      key={periodPlan.idPeriodPlan}
      item
      sx={{
        width: {
          xs: "100%",
          sm: "95%",
          md: "auto",
          lg: "auto",
          xl: "auto",
        },
      }}
    >
      <Card elevation={18} square sx={cardMuiStyle}>
        <CardHeader
          style={{ textAlign: "left" }}
          title={
            <>
              <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
                alignItems="center"
                mb={1}
              >
                <Typography
                  variant="subtitle4"
                  fontWeight={700}
                  letterSpacing=".25rem"
                  ml={2}
                >
                  {periodPlan.planName}
                </Typography>
              </Grid>
              <Divider color="gray" />
            </>
          }
        />
        <CardContent>
          {periodPlan.taskEntitys.map((task) => (
            <TaskDetailsAccordion key={task.idTask} task={task} />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default TaskCard;
