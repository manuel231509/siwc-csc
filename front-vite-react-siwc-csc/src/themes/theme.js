import { createTheme } from "@mui/material/styles";
import {
  primaryColorPaletteTeal as pTeal,
  secondaryColorPaletteDeepOrange as sDeepOrange,
  tertiaryColorPaletteGreen as tGreen,
} from "../color-palette";

const font = "'Montserrat', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: font,
    h7: {
      fontFamily: font,
      fontSize: "0.5rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle3: {
      fontFamily: font,
      fontSize: "0.6rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle4: {
      fontFamily: font,
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    
  },

  palette: {
    primary: {
      pTeal,

      pTeal800: {
        light: pTeal["800"]["light"]["value"],
        main: pTeal["800"]["light"]["value"],
        dark: pTeal["800"]["light"]["value"],

        contrastTextLight: pTeal["800"]["light"]["contrastText"],
        contrastTextMain: pTeal["800"]["main"]["contrastText"],
        contrastTextDark: pTeal["800"]["dark"]["contrastText"],
      },

      pTeal100: {
        light: pTeal["100"]["light"]["value"],
        main: pTeal["100"]["light"]["value"],
        dark: pTeal["100"]["light"]["value"],

        contrastTextLight: pTeal["100"]["light"]["contrastText"],
        contrastTextMain: pTeal["100"]["main"]["contrastText"],
        contrastTextDark: pTeal["100"]["dark"]["contrastText"],
      },

      light: pTeal["900"]["light"]["value"],
      main: pTeal["900"]["main"]["value"],
      dark: pTeal["900"]["dark"]["value"],

      contrastTextLight: pTeal["900"]["light"]["contrastText"],
      contrastTextMain: pTeal["900"]["main"]["contrastText"],
      contrastTextDark: pTeal["900"]["dark"]["contrastText"],
    },

    secondary: {
      sDeepOrange,

      light: sDeepOrange["900"]["light"]["value"],
      main: sDeepOrange["900"]["main"]["value"],
      dark: sDeepOrange["900"]["dark"]["value"],

      contrastTextLight: sDeepOrange["900"]["light"]["contrastText"],
      contrastTextMain: sDeepOrange["900"]["main"]["contrastText"],
      contrastTextDark: sDeepOrange["900"]["dark"]["contrastText"],
    },

    tertiary: {
      tGreen,

      tGreen50: {
        light: tGreen["50"]["light"]["value"],
        main: tGreen["50"]["main"]["value"],
        dark: tGreen["50"]["dark"]["value"],

        contrastTextLight: tGreen["50"]["light"]["contrastText"],
        contrastTextMain: tGreen["50"]["main"]["contrastText"],
        contrastTextDark: tGreen["50"]["dark"]["contrastText"],
      },

      tGreen100: {
        light: tGreen["100"]["light"]["value"],
        main: tGreen["100"]["main"]["value"],
        dark: tGreen["100"]["dark"]["value"],

        contrastTextLight: tGreen["100"]["light"]["contrastText"],
        contrastTextMain: tGreen["100"]["main"]["contrastText"],
        contrastTextDark: tGreen["100"]["dark"]["contrastText"],
      },

      light: tGreen["900"]["light"]["value"],
      main: tGreen["900"]["main"]["value"],
      dark: tGreen["900"]["dark"]["value"],

      contrastTextLight: tGreen["900"]["light"]["contrastText"],
      contrastTextMain: tGreen["900"]["main"]["contrastText"],
      contrastTextDark: tGreen["900"]["dark"]["contrastText"],
    },
  },
  shadows: [...createTheme({}).shadows, `0px 0px 30px 5px rgba(0, 0, 0, 0.48)`],
});

export default theme;
