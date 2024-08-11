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
import { AccordionDetails, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import useWindowSize from "../../../../../../../../../../../hooks/useWindowSize";
import { StyledBadgeStyled } from "./Styled/DeliveredTaskAccordionDetailsStyled";
import { lazy } from "react";

const FormQualificationNotes = lazy(() =>
  import("./Form Qualification Notes/FormQualificationNotes")
);

const DeliveredTaskAccordionDetails = ({ deliveredTaskStudent }) => {
  const { width } = useWindowSize();
  const theme = useTheme();
  const sDeepOrange = theme.palette.secondary.sDeepOrange;
  const { taskStudentComment, publishedFileEntitys } =
    deliveredTaskStudent.publishedTaskEntitys[0];

  const [isHovering, setIsHovering] = useState({});
  const handleMouseEnter = (nameField, value) => () => {
    setIsHovering({ ...isHovering, [nameField]: value });
  };
  const handleMouseLeave = (nameField, value) => () => {
    setIsHovering({ ...isHovering, [nameField]: value });
  };

  return (
    <AccordionDetails>
      <Grid container rowGap={1}>
        <Grid container justifyContent="center" rowGap={1}>
          <FormQualificationNotes />
        </Grid>
        <Grid container rowGap={1} boxShadow={3} borderRadius="12px" p={1}>
          <Grid item xs={12} p={1} container rowGap={1}>
            <Grid container>
              <Typography
                variant="subtitle2"
                textAlign={taskStudentComment ? "left" : "center"}
                fontWeight={600}
                fontSize={12}
                color={sDeepOrange["300"]["light"]["contrastText"]}
                letterSpacing={".098rem"}
              >
                STUDENT COMMENT:
              </Typography>
            </Grid>
            <Grid container>
              <Typography
                variant="subtitle2"
                textAlign={taskStudentComment ? "left" : "center"}
                fontWeight={taskStudentComment ? 400 : 500}
                fontSize={taskStudentComment ? 12 : 11}
                color={sDeepOrange["300"]["light"]["contrastText"]}
                letterSpacing={".098rem"}
              >
                {taskStudentComment ? taskStudentComment : "NO COMMENT FOUND."}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          rowGap={1}
          boxShadow={2}
          p={1.5}
          sx={{ border: "1px solid gray", borderRadius: "12px" }}
        >
          <Grid
            container
            justifyContent="center"
            p={1.5}
            pt={0.1}
            columnGap={2.5}
            rowGap={0.5}
            borderBottom="1px solid gray"
          >
            <StyledBadgeStyled
              badgeContent={publishedFileEntitys?.length}
              color="secondary"
            >
              <FontAwesomeIcon icon={faFileSolid} fontSize={22} />
            </StyledBadgeStyled>
            <Typography
              variant="subtitle1"
              fontSize={12}
              fontWeight={600}
              textAlign={{ xs: "center", sm: "initial" }}
              letterSpacing=".17rem"
            >
              ATTACHED FILES
            </Typography>
          </Grid>
          <Grid container sx={{ maxHeight: "50vh", overflowY: "auto" }}>
            {publishedFileEntitys?.map((file, index) => {
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
                    {...(width < 600 ? { xs: 12 } : { xs: 9 })}
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
      </Grid>
    </AccordionDetails>
  );
};

export default DeliveredTaskAccordionDetails;
