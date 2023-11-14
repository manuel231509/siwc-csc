import React from "react";
import { Grid, CardContent as MuiCardContent, Typography } from "@mui/material";
import { maxWidth } from "@mui/system";
import { GridChatBotStyled, GridYouStyled } from "./Stryled/CardContentStyled";
import ThreePointAnimation from "./Writing/ThreePointAnimation";

const CardContent = ({ context }) => {
  const { loadingChatbot, messageChatbot } = context();
  return (
    <MuiCardContent
      sx={{
        minHeight: 200,
        maxHeight: 300,
        display: "flex",
        overflowY: "auto",
        flexDirection: "column-reverse",
      }}
    >
      {loadingChatbot["predict-chat"] && <ThreePointAnimation />}
      {messageChatbot.map((m, index) => {
        if (m.name === "Colsace" && !loadingChatbot["predict-chat"])
          return <GridChatBotStyled key={index} text={m.message} />;
        if (m.name === "You")
          return <GridYouStyled key={index} text={m.message} />;
      })}
    </MuiCardContent>
  );
};

export default CardContent;
