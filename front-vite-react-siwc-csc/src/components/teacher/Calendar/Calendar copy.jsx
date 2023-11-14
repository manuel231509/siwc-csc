import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  Today,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

const BoxCalendarStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "aquamarine",
  overflow: "auto",
}));

const BoxHeaderCalendarStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const TypographyMonth = styled(Typography)(({ theme }) => ({
  // marginRight: 10,
}));

const useStyles = makeStyles((theme) => ({
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 10,
    marginBottom: 10,
  },
  day: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "blue",
  },
  activities: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 10,
    backgroundColor: "red",
  },
  activity: {
    textAlign: "center",
    backgroundColor: "yellow",
    padding: 10,
  },
}));

const Calendar = () => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const previousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      return new Date(prevDate.getFullYear(), prevMonth, 1);
    });
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      return new Date(prevDate.getFullYear(), nextMonth, 1);
    });
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day) => (
      <Typography
        key={day}
        variant="body1"
        className={classes.day}
        color="textSecondary"
      >
        {day}
      </Typography>
    ));
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];

    for (let i = 1; i <= startOffset; i++) {
      days.push(
        <Typography
          key={`empty-${i}`}
          variant="body1"
          className={classes.activity}
        >
          {" "}
        </Typography>
      );
    }

    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(year, month, i);
      days.push(
        <Typography
          key={`day-${i}`}
          variant="body1"
          className={classes.activity}
        >
          {i}
        </Typography>
      );
    }

    return days;
  };

  return (
    <BoxCalendarStyled>
      <BoxHeaderCalendarStyled>
        <IconButton onClick={previousMonth}>
          <ChevronLeft />
        </IconButton>
        <TypographyMonth variant="h6">
          {monthsOfYear[currentDate.getMonth()]} {currentDate.getFullYear()}
        </TypographyMonth>
        <IconButton onClick={nextMonth}>
          <ChevronRight />
        </IconButton>
      </BoxHeaderCalendarStyled>
      <Box className={classes.days}>{renderDaysOfWeek()}</Box>
      <Box className={classes.activities}>{renderCalendarDays()}</Box>
    </BoxCalendarStyled>
  );
};

export default Calendar;
