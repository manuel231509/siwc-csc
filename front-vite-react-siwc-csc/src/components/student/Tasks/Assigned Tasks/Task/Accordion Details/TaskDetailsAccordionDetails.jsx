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
import {
  AccordionDetails,
  Badge,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useStudentContext } from "../../../../../../context/Student/StudentProvider";
import useWindowSize from "../../../../../../hooks/useWindowSize";
import ModalDeliverTask from "./Modal Deliver Task/ModalDeliverTask";
import { getObjectLocalStorageDescrypted } from "../../../../../../LocalStorage/LocalStorage";

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

const TaskDetailsAccordionDetails = ({ task }) => {
  const theme = useTheme();
  const windowSize = useWindowSize();

  const {
    handleChangeOpenModalDeliverTask,
    handleChangeSelect,
    handleChangeSelect1,
    select,
  } = useStudentContext();

  const sDeepOrange = theme.palette.secondary.sDeepOrange;

  const date = new Date(task.datePublicationTask);

  const taskPublishedDate = date.toLocaleDateString("en-US", options);

  const [isHovering, setIsHovering] = useState({});
  const handleMouseEnter = (nameField, value) => () => {
    setIsHovering({ ...isHovering, [nameField]: value });
  };
  const handleMouseLeave = (nameField, value) => () => {
    setIsHovering({ ...isHovering, [nameField]: value });
  };

  const { session } = useSelector((store) => store.ssession);
  const { student } = session;

  const publishedTaskEntitys = task.publishedTaskEntitys.filter(
    (publishedTask) =>
      publishedTask.idTask === task.idTask &&
      publishedTask.idNumberStudent === student.idNumberStudent
  );

  return (
    <AccordionDetails
      xs={{
        ...(windowSize.width > 280 && {
          marginLeft: 2,
          marginRight: 2,
        }),
        p: 0.2,
      }}
    >
      <Grid container justifyContent="flex-start" alignItems="center">
        <Typography
          variant="subtitle3"
          fontSize={8.5}
          fontWeight={500}
          letterSpacing={".12rem"}
          color="gray"
        >
          PUBLISHED: {taskPublishedDate.toLocaleUpperCase()}
        </Typography>
      </Grid>
      <Grid container rowGap={1} p={0.3}>
        <Grid item xs={12} p={1.5}>
          <Typography
            variant="subtitle2"
            textAlign={task.taskDescription ? "justify" : "center"}
            fontWeight={task.taskDescription ? 400 : 600}
            fontSize={task.taskDescription ? 12 : 11}
            color={sDeepOrange["300"]["light"]["contrastText"]}
            letterSpacing={".098rem"}
          >
            {task.taskDescription
              ? task.taskDescription
              : "NO DESCRIPTION FOUND."}
          </Typography>
        </Grid>
        {task.taskFileEntitys.length > 0 && (
          <Grid
            container
            p={1.5}
            sx={{
              border: "1px solid gray",
              borderRadius: "12px",
            }}
          >
            <Grid
              container
              justifyContent={"center"}
              pb={1}
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
                          icon={
                            !isHovering[`file-${index}`] ? faEye : faEyeSolid
                          }
                          fontSize={20}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
        {publishedTaskEntitys[0]?.publishedFileEntitys.length > 0 && (
          <Grid item xs container>
            <Grid item xs={12} p={1.5}>
              <Typography
                variant="subtitle2"
                textAlign={"justify"}
                fontWeight={700}
                color={sDeepOrange["300"]["light"]["contrastText"]}
                letterSpacing={".098rem"}
              >
                UPLOADED FILES
              </Typography>
            </Grid>
            <Grid
              container
              p={1.5}
              sx={{
                border: "1px solid gray",
                borderRadius: "12px",
              }}
            >
              <Grid
                container
                justifyContent={"center"}
                pb={1}
                borderBottom={"1px solid gray"}
              >
                <StyledBadge
                  sx={{ mr: "1rem" }}
                  badgeContent={
                    publishedTaskEntitys[0]?.publishedFileEntitys.length
                  }
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
                {publishedTaskEntitys[0]?.publishedFileEntitys.map(
                  (file, index) => {
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
                            onMouseEnter={handleMouseEnter(
                              `file-${index}`,
                              true
                            )}
                            onMouseLeave={handleMouseLeave(
                              `file-${index}`,
                              false
                            )}
                          >
                            <FontAwesomeIcon
                              icon={
                                !isHovering[`file-${index}`]
                                  ? faEye
                                  : faEyeSolid
                              }
                              fontSize={20}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
        {task.publishedTaskEntitys.filter(
          (publishedTask) =>
            publishedTask.idPublishedTask ===
              `${task.idTask}_${student.idNumberStudent}` &&
            publishedTask.taskDelivered === false
        ).length > 0 &&
          task.taskQualificationPoints !== 0 && (
            <Grid container>
              <Grid item xs container justifyContent={"center"}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    const selectTask = { ...task };
                    const selectPublishedTask =
                      selectTask.publishedTaskEntitys.filter(
                        (publishedTask) =>
                          publishedTask.idPublishedTask ===
                          `${task.idTask}_${student.idNumberStudent}`
                      );
                    selectTask.publishedTaskEntitys = selectPublishedTask;
                    const selectDegree =
                      getObjectLocalStorageDescrypted("task-degree");
                    handleChangeSelect1({
                      ...select,
                      ...{ task: selectTask, degree: selectDegree },
                    });
                    handleChangeOpenModalDeliverTask();
                  }}
                  sx={{
                    "&:hover": {
                      color:
                        theme.palette.secondary.sDeepOrange["500"]["dark"][
                          "contrastText"
                        ],
                      backgroundColor:
                        theme.palette.secondary.sDeepOrange["500"]["dark"][
                          "value"
                        ],
                    },
                  }}
                >
                  DELIVER TASK
                </Button>
              </Grid>
            </Grid>
          )}
        <ModalDeliverTask />
      </Grid>
    </AccordionDetails>
  );
};

export default TaskDetailsAccordionDetails;
