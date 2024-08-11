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

      tGreen900: {
        light: tGreen["900"]["light"]["value"],
        main: tGreen["900"]["main"]["value"],
        dark: tGreen["900"]["dark"]["value"],

        contrastTextLight: tGreen["900"]["light"]["contrastText"],
        contrastTextMain: tGreen["900"]["main"]["contrastText"],
        contrastTextDark: tGreen["900"]["dark"]["contrastText"],
      },

      tGreen800: {
        light: tGreen["800"]["light"]["value"],
        main: tGreen["800"]["main"]["value"],
        dark: tGreen["800"]["dark"]["value"],

        contrastTextLight: tGreen["800"]["light"]["contrastText"],
        contrastTextMain: tGreen["800"]["main"]["contrastText"],
        contrastTextDark: tGreen["800"]["dark"]["contrastText"],
      },

      tGreen700: {
        light: tGreen["700"]["light"]["value"],
        main: tGreen["700"]["main"]["value"],
        dark: tGreen["700"]["dark"]["value"],

        contrastTextLight: tGreen["700"]["light"]["contrastText"],
        contrastTextMain: tGreen["700"]["main"]["contrastText"],
        contrastTextDark: tGreen["700"]["dark"]["contrastText"],
      },

      tGreen600: {
        light: tGreen["600"]["light"]["value"],
        main: tGreen["600"]["main"]["value"],
        dark: tGreen["600"]["dark"]["value"],

        contrastTextLight: tGreen["600"]["light"]["contrastText"],
        contrastTextMain: tGreen["600"]["main"]["contrastText"],
        contrastTextDark: tGreen["600"]["dark"]["contrastText"],
      },

      tGreen500: {
        light: tGreen["500"]["light"]["value"],
        main: tGreen["500"]["main"]["value"],
        dark: tGreen["500"]["dark"]["value"],

        contrastTextLight: tGreen["500"]["light"]["contrastText"],
        contrastTextMain: tGreen["500"]["main"]["contrastText"],
        contrastTextDark: tGreen["500"]["dark"]["contrastText"],
      },

      tGreen400: {
        light: tGreen["400"]["light"]["value"],
        main: tGreen["400"]["main"]["value"],
        dark: tGreen["400"]["dark"]["value"],

        contrastTextLight: tGreen["400"]["light"]["contrastText"],
        contrastTextMain: tGreen["400"]["main"]["contrastText"],
        contrastTextDark: tGreen["400"]["dark"]["contrastText"],
      },

      tGreen300: {
        light: tGreen["300"]["light"]["value"],
        main: tGreen["300"]["main"]["value"],
        dark: tGreen["300"]["dark"]["value"],

        contrastTextLight: tGreen["300"]["light"]["contrastText"],
        contrastTextMain: tGreen["300"]["main"]["contrastText"],
        contrastTextDark: tGreen["300"]["dark"]["contrastText"],
      },

      tGreen200: {
        light: tGreen["200"]["light"]["value"],
        main: tGreen["200"]["main"]["value"],
        dark: tGreen["200"]["dark"]["value"],

        contrastTextLight: tGreen["200"]["light"]["contrastText"],
        contrastTextMain: tGreen["200"]["main"]["contrastText"],
        contrastTextDark: tGreen["200"]["dark"]["contrastText"],
      },

      tGreen100: {
        light: tGreen["100"]["light"]["value"],
        main: tGreen["100"]["main"]["value"],
        dark: tGreen["100"]["dark"]["value"],

        contrastTextLight: tGreen["100"]["light"]["contrastText"],
        contrastTextMain: tGreen["100"]["main"]["contrastText"],
        contrastTextDark: tGreen["100"]["dark"]["contrastText"],
      },

      tGreen50: {
        light: tGreen["50"]["light"]["value"],
        main: tGreen["50"]["main"]["value"],
        dark: tGreen["50"]["dark"]["value"],

        contrastTextLight: tGreen["50"]["light"]["contrastText"],
        contrastTextMain: tGreen["50"]["main"]["contrastText"],
        contrastTextDark: tGreen["50"]["dark"]["contrastText"],
      },

      tGreenA700: {
        light: tGreen["A700"]["light"]["value"],
        main: tGreen["A700"]["main"]["value"],
        dark: tGreen["A700"]["dark"]["value"],

        contrastTextLight: tGreen["A700"]["light"]["contrastText"],
        contrastTextMain: tGreen["A700"]["main"]["contrastText"],
        contrastTextDark: tGreen["A700"]["dark"]["contrastText"],
      },

      tGreenA400: {
        light: tGreen["A400"]["light"]["value"],
        main: tGreen["A400"]["main"]["value"],
        dark: tGreen["A400"]["dark"]["value"],

        contrastTextLight: tGreen["A400"]["light"]["contrastText"],
        contrastTextMain: tGreen["A400"]["main"]["contrastText"],
        contrastTextDark: tGreen["A400"]["dark"]["contrastText"],
      },

      tGreenA200: {
        light: tGreen["A200"]["light"]["value"],
        main: tGreen["A200"]["main"]["value"],
        dark: tGreen["A200"]["dark"]["value"],

        contrastTextLight: tGreen["A200"]["light"]["contrastText"],
        contrastTextMain: tGreen["A200"]["main"]["contrastText"],
        contrastTextDark: tGreen["A200"]["dark"]["contrastText"],
      },

      tGreenA100: {
        light: tGreen["A100"]["light"]["value"],
        main: tGreen["A100"]["main"]["value"],
        dark: tGreen["A100"]["dark"]["value"],

        contrastTextLight: tGreen["A100"]["light"]["contrastText"],
        contrastTextMain: tGreen["A100"]["main"]["contrastText"],
        contrastTextDark: tGreen["A100"]["dark"]["contrastText"],
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
