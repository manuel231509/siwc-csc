import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const RoundTextField = styled(
  ({ theme, borderRadius, taskNote, ...otherProps }) => (
    <TextField {...otherProps} />
  )
)(({ theme, borderRadius, taskNote, disabled }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: borderRadius || "20px",
    overflow: "hidden",

    [theme.breakpoints.between("xs", "sm")]: { width: "40px" },
    [theme.breakpoints.between("sm", "md")]: { width: "45px" },
    [theme.breakpoints.up("md")]: { width: "50px" },

    backgroundColor:
      taskNote >= 0 && taskNote < 3
        ? "#f44336"
        : taskNote >= 3 && taskNote < 4
        ? "#ff5722"
        : "#4caf50",
    color:
      taskNote >= 0 && taskNote < 4
        ? "#FFFFFF"
        : taskNote >= 4 && taskNote <= 5.0 && "rgba(0, 0, 0, 0.87)",
    "&:hover": {
      backgroundColor:
        taskNote >= 0 && taskNote < 3
          ? "#AA2E25"
          : taskNote >= 3 && taskNote < 4
          ? "#C9471F"
          : "#357A38",
      color: taskNote >= 3 && "#FFFFFF",
    },
    "& .Mui-disabled": {
      "-webkit-text-fill-color":
        taskNote >= 0 && taskNote < 4
          ? "rgba(255, 255, 255, 0.7)"
          : taskNote >= 4 && taskNote <= 5.0 && "rgba(0, 0, 0, 0.7)",
    },
    "& input": {
      padding: "12px 8px",
      textAlign: "center",
      fontWeight: "bold",
    },
  },
}));
