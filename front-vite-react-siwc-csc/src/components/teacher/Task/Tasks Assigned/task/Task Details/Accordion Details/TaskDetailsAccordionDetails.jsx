import {
  faEye,
  faFileImage,
  faFilePdf,
  faFileVideo,
  faFileWord,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEye as faEyeSolid,
  faFile as faFileSolid,
  faFileText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight as ArrowRightIcon } from "@mui/icons-material";
import {
  AccordionDetails,
  Badge,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useTasksAssignedContext } from "../../../../../../../context/Tasks/TasksProvider";
import { SuspenseProgress } from "../../../../../../SuspenseProgress/SusProg";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    left: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const TaskDetailsAccordionDetails = ({ windowSize, task }) => {
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange;

  const date = new Date(task.datePublicationTask);

  const taskPublishedDate = date.toLocaleDateString("en-US", options);

  const { handleChangeOpenModalDeliveredTask, select, handleChangeSelect } =
    useTasksAssignedContext();

  const [isHovering, setIsHovering] = useState({});
  const handleMouseEnter = (nameField, value) => () => {
    setIsHovering({ ...isHovering, [nameField]: value });
  };
  const handleMouseLeave = (nameField, value) => () => {
    setIsHovering({ ...isHovering, [nameField]: value });
  };

  return (
    <>
      <Grid container justifyContent={"flex-start"} alignItems="center">
        <Typography
          variant="subtitle3"
          fontSize={8.5}
          fontWeight={500}
          letterSpacing={".12rem"}
          color="gray"
        >
          PUBLISHED: {taskPublishedDate}
        </Typography>
        <ArrowRightIcon
          fontSize="small"
          sx={{
            color: "gray",
            mt: -0.15,
          }}
        />
        <Typography
          variant="subtitle3"
          fontSize={8.2}
          fontWeight={500}
          letterSpacing={".12rem"}
          color="gray"
        >
          {task.publishedTaskEntitys.length} STUDENT
          {task.publishedTaskEntitys.length > 1 ? "S" : ""}
        </Typography>
      </Grid>
      <Grid container rowGap={1}>
        <Grid item xs={12} p={1}>
          <Typography
            variant="subtitle2"
            textAlign={task.taskDescription ? "left" : "center"}
            fontWeight={task.taskDescription ? 400 : 600}
            color={sDeepOrange["300"]["light"]["contrastText"]}
            letterSpacing={".098rem"}
          >
            {task.taskDescription
              ? task.taskDescription
              : "NO DESCRIPTION FOUND."}
          </Typography>
        </Grid>
        <Grid
          container
          rowGap={1}
          p={1.5}
          sx={{
            border: "1px solid gray",
            borderRadius: "12px",
          }}
        >
          <Grid
            container
            justifyContent={"center"}
            p={1.5}
            pt={0.1}
            columnGap={2.5}
            rowGap={0.5}
            borderBottom={"1px solid gray"}
          >
            <StyledBadge
              sx={{ mr: "1rem" }}
              badgeContent={task.taskFileEntitys.length}
              color="secondary"
            >
              <FontAwesomeIcon icon={faFileSolid} fontSize={22} />
            </StyledBadge>
            <Typography
              variant="subtitle1"
              fontSize={12}
              fontWeight={600}
              letterSpacing=".17rem"
            >
              ATTACHED FILES
            </Typography>
          </Grid>
          <Grid container sx={{ maxHeight: "50vh", overflowY: "auto" }}>
            {task.taskFileEntitys.map((file, index) => {
              const {
                fileName: nameFile,
                fileType: type,
                idFile: id,
                fileUrl: url,
              } = file;
              return (
                <Grid
                  container
                  key={index}
                  mt={1}
                  p={1}
                  justifyContent="center"
                  alignItems="center"
                  rowGap={0.8}
                  columnGap={1}
                  borderBottom="1px solid gray"
                >
                  <Grid
                    item
                    xs
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FontAwesomeIcon
                      icon={
                        type === "image/jpg" ||
                        type === "image/jpeg" ||
                        type === "image/png"
                          ? faFileImage
                          : type === "video/mp4"
                          ? faFileVideo
                          : type === "text/txt" || type === "text/plain"
                          ? faFileText
                          : type === "application/pdf"
                          ? faFilePdf
                          : (type === "application/docx" ||
                              type === "application/doc" ||
                              type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                            faFileWord
                      }
                      fontSize={40}
                    />
                  </Grid>
                  <Grid
                    item
                    {...(windowSize.width < 600 ? { xs: 12 } : { xs: 9 })}
                    p={1}
                    container
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle3"
                      fontWeight={500}
                      fontSize={12.5}
                      letterSpacing=".12rem"
                      textAlign="justify"
                    >
                      {nameFile.replace(/_|-/gi, " ")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="preview-file"
                      onClick={() => window.open(url, "_blank")}
                      onMouseEnter={handleMouseEnter(`file-${index}`, true)}
                      onMouseLeave={handleMouseLeave(`file-${index}`, false)}
                    >
                      <FontAwesomeIcon
                        icon={!isHovering[`file-${index}`] ? faEye : faEyeSolid}
                        fontSize={20}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container columnGap={1} rowGap={1.5}>
          <Grid
            item
            xs
            onClick={() => {
              handleChangeSelect("task", task);
              handleChangeOpenModalDeliveredTask();
            }}
            sx={{
              pl: 0.5,
              pr: 0.5,
              borderLeft: "1px solid #bdbdbd",
              borderRight: "1px solid #bdbdbd",
              "&:hover": {
                color: theme.palette.secondary.light,
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} fontSize={23}>
              {
                task.publishedTaskEntitys.filter(
                  (published) => published.taskDelivered === true
                ).length
              }
            </Typography>
            <Typography
              variant="subtitle3"
              fontSize={13}
              fontWeight={600}
              letterSpacing=".08rem"
              mt={-5}
            >
              DELIVERED
            </Typography>
          </Grid>
          <Grid
            item
            xs
            sx={{
              pl: 0.5,
              pr: 0.5,
              borderLeft: "1px solid #bdbdbd",
              borderRight: "1px solid #bdbdbd",
              "&:hover": {
                color: theme.palette.secondary.light,
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} fontSize={23}>
              {task.publishedTaskEntitys.length}
            </Typography>
            <Typography
              variant="subtitle3"
              fontSize={13}
              fontWeight={600}
              letterSpacing=".08rem"
              mt={-5}
            >
              ASSIGNED
            </Typography>
          </Grid>
          <Grid
            item
            xs
            sx={{
              pl: 0.5,
              pr: 0.5,
              borderLeft: "1px solid #bdbdbd",
              borderRight: "1px solid #bdbdbd",
              "&:hover": {
                color: theme.palette.secondary.light,
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} fontSize={23}>
              {
                task.publishedTaskEntitys.filter(
                  (published) => published.qualifiedTask === true
                ).length
              }
            </Typography>
            <Typography
              variant="subtitle3"
              fontSize={13}
              fontWeight={600}
              letterSpacing=".08rem"
              mt={-5}
            >
              QUALIFIED
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default TaskDetailsAccordionDetails;
