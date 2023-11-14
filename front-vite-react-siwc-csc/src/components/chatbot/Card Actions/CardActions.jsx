import React from "react";
import { CardActions as MuiCardActions } from "@mui/material";
import FormChatboot from "./Form Chatbot/FormChatboot";

const CardActions = ({ context }) => {
  return (
    <MuiCardActions
      sx={{
        bgcolor: (theme) => theme.palette.primary["light"],
        color: (theme) => theme.palette.primary["contrastTextLight"],

        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <FormChatboot context={context} />
    </MuiCardActions>
  );
};

export default CardActions;
