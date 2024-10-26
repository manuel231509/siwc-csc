import {
  faFileImage,
  faFilePdf,
  faFileVideo,
  faFileWord,
} from "@fortawesome/free-regular-svg-icons";
import { faFileText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { sweetAlert } from "../../../../../../../../../../sweetAlert2/SweetAlert";
import "./Styles/StyleSweetAlert.css";

const GridStyled = styled(Grid)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  width: "100%",
  outline: "none",
}));

const maxSize = 1024 * 1024 * 50;

const MultipleFileUploadField = ({
  files,
  handleChangeFieldsFiles,
  windowSize,
}) => {
  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({
      id: uuidv4(),
      file,
      errors: [],
    }));
    const mappedRej = rejFiles.map((rej) => ({ ...rej, id: uuidv4() }));

    if (mappedRej[0]?.errors) {
      sweetAlert({
        toast: true,
        position: "top-end",
        icon: "error",
        title: mappedRej[0]?.errors[0]?.code.toUpperCase(),
        html:
          mappedRej[0]?.errors[0]?.code === "TOO-MANY-FILES".toLowerCase()
            ? mappedRej[0]?.errors[0]?.message.toUpperCase()
            : "NAME FILE: " +
              mappedRej[0]?.file?.name +
              "<br/>" +
              "<br/>" +
              mappedRej[0]?.errors[0]?.message.toUpperCase(),
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      return;
    }

    handleChangeFieldsFiles(mappedAcc);
  }, []);

  const onDelete = (id) => {
    const filterFiles = files.filter((file) => file.id !== id);
    handleChangeFieldsFiles(filterFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/png": [".png"],
        "video/mp4": [".mp4"],
        "audio/*": [],
        "text/txt": [".txt"],
        "application/pdf": [".pdf"],
        "application/docx": [".docx"],
        "application/doc": [".doc"],
      },
      minSize: 1024,
      maxSize,
      maxFiles: 5,
    });

  return (
    <>
      <Grid container sx={{ maxHeight: "28vh", overflowY: "auto" }}>
        {files?.map((fileWrapper, index) => {
          const { name, type } = fileWrapper.file;
          const nameFile = name;
          const id = fileWrapper.id;
          return (
            <Grid
              container
              mt={1}
              p={1}
              justifyContent="center"
              alignItems="center"
              key={id}
              rowGap={0.8}
              columnGap={1}
              borderBottom="1px solid #000"
            >
              <Grid
                item
                xs
                container
                justifyContent={"center"}
                alignItems={"center"}
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
                {...(windowSize.width < 600 ? { xs: 12 } : { xs: 8 })}
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
                  {nameFile.replace(/_|#|-|@|<>/g, " ")}
                </Typography>
              </Grid>
              <Grid
                item
                xs
                container
                justifyContent="center"
                alignItems="center"
              >
                <IconButton aria-label="delete" onClick={() => onDelete(id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      {files?.length < 5 && (
        <GridStyled {...getRootProps()}>
          <input name="files" {...getInputProps()} />
          <Grid container justifyContent="center" alignItems="center" p={2}>
            <Typography
              variant={"subtitle1"}
              fontSize={{ xs: 9.5, sm: 12, md: 13 }}
              fontWeight={500}
              letterSpacing=".11rem"
              textAlign="center"
            >
              {!isDragActive
                ? "Drag 'n' drop some files here, or click to select file(s), MAXIMUM 5 FILES.".toUpperCase()
                : "Drop the file(s)".toUpperCase()}
              {isDragReject && "File type not accepted, sorry!".toUpperCase()}
            </Typography>
          </Grid>
        </GridStyled>
      )}
    </>
  );
};
export default MultipleFileUploadField;
