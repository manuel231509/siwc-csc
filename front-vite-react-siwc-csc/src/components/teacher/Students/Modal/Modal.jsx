import { Close } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Grid,
  Modal as ModalMui,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTeacherContext } from "../../../../context/Teacher/TeacherProvider";
import useWindowSize from "../../../../hooks/useWindowSize";
import EnhancedTable from "../EnhancedTableStudents/EnhancedTable";
import { FadeStyled, IconButtonStyled } from "./ModalStyled/ModalStyled";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 25,
};

const Modal = () => {
  const theme = useTheme();
  const { height } = useWindowSize();
  const pTeal = theme.palette.primary;
  const { openModal, handleChangeCloseModal, modalData } = useTeacherContext();
  return (
    <ModalMui
      arial-labelledby="transition-modal-title"
      arial-describedby="transition-modal-description"
      open={openModal}
      onClose={handleChangeCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
      }}
    >
      <FadeStyled in={openModal}>
        <Box sx={styleBox}>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems="center"
            sx={{
              flexGrow: 1,
              p: 1.7,
              width: { xs: "89.4vw", sm: "89.6vw", md: "79.7vw", lg: "79.8vw" },
              borderBottom: "2.9px solid #000000",
              boxShadow: 10,
            }}
            bgcolor={pTeal["main"]}
          >
            <Grid item xs={10.5} sx={{ flexGrow: 1 }}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h4"
                textAlign="center"
                fontWeight={400}
                letterSpacing={{ xs: ".2rem" }}
                color={pTeal["contrastTextMain"]}
                fontSize={{ xs: ".7rem", sm: "0.9rem", md: "1.1rem" }}
              >
                {`STUDENT LIST OF ${modalData?.subject?.nameSubject} (${modalData?.degree?.nameDegree})`}
              </Typography>
            </Grid>
            <Grid item xs={1.5} container justifyContent="end">
              <IconButtonStyled
                onClick={handleChangeCloseModal}
                sx={{ color: pTeal["contrastTextMain"] }}
              >
                {theme.direction !== "rtl" && <Close />}
              </IconButtonStyled>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems="center"
            sx={{
              flexGrow: 1,
              p: 1.7,
              width: { xs: "89.4vw", sm: "89.6vw", md: "79.7vw", lg: "79.8vw" },
              ...(height > 0 && height < 400 && { height: "65vh" }),
              ...(height > 400 && height <= 600 && { height: "75vh" }),
              borderBottom: "2.9px solid #000000",
              boxShadow: 10,
              maxWidth: "98vw",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            bgcolor={pTeal.pTeal800["main"]}
          >
            <EnhancedTable />
          </Grid>
        </Box>
      </FadeStyled>
    </ModalMui>
  );
};

export default Modal;
