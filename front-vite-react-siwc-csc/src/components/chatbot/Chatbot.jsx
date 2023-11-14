import { Forum as ForumIcon } from "@mui/icons-material";
import { Box, Card, Fab, Zoom } from "@mui/material";
import React from "react";
import CardContent from "./Card Content/CardContent";
import CardHeader from "./Card Header/CardHeader";
import CardActions from "./Card Actions/CardActions";

const Chatbot = ({ context }) => {
  const { checkedChatbot, handleChangeCheckedChatbot } = context();
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Zoom
        in={checkedChatbot}
        style={{
          position: "fixed",
          bottom: 75,
          right: 16,
          zIndex: 1202,
          transitionDelay: checkedChatbot ? "600ms" : "0ms",
        }}
      >
        <Card sx={{ maxWidth: 345, minWidth: 300 }} elevation={5}>
          <CardHeader context={context} />
          <CardContent context={context} />
          <CardActions context={context} />
        </Card>
      </Zoom>
      <Fab
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1202 }}
        size="medium"
        color="secondary"
        aria-label="chat"
        onClick={handleChangeCheckedChatbot}
      >
        <ForumIcon />
      </Fab>
    </Box>
  );
};

export default Chatbot;
