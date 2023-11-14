import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { GridChatBotStyled } from "../Stryled/CardContentStyled";
import { Grid } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  point: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "black",
    marginRight: 10,
    opacity: 0.3,
    transition: "all 0.5s ease",
  },
  active: {
    opacity: 1,
    transform: "translateY(-12px)",
  },
  desactive: {
    opacity: 0,
    transform: "translateY(12px)",
  },
}));

const ThreePointAnimation = () => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <GridChatBotStyled>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${classes.point} ${
            index === activeIndex ? classes.active : ""
          }`}
        />
      ))}
    </GridChatBotStyled>
  );
};

export default ThreePointAnimation;
