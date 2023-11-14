import React from "react";
import { Avatar, CardHeader as MuiCardHeader, Typography } from "@mui/material";

const CardHeader = ({ context }) => {
  const { handleChangeCheckedChatbot } = context();
  return (
    <MuiCardHeader
      sx={{
        bgcolor: (theme) => theme.palette.primary["light"],
        color: (theme) => theme.palette.primary["contrastTextLight"],
        textAlign: "center",
        cursor: "pointer",
      }}
      avatar={
        <Avatar
          aria-label="recipe"
          src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
          alt="image avatar"
          sx={{ mr: 0 }}
        />
      }
      title={
        <Typography variant="subtitle1" fontWeight={700} letterSpacing=".2rem">
          CHAT SUPPORT
        </Typography>
      }
      subheader={
        <Typography variant="subtitle2" fontWeight={400} letterSpacing=".1rem">
          Hola, mi nombre es Colsace. <br /> ¿Como puedo ayudarte?
        </Typography>
      }
      onClick={handleChangeCheckedChatbot}
    />
  );
};

export default CardHeader;
