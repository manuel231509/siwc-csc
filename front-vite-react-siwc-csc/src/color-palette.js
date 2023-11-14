const whiteText = "#ffffff";
const blackText = "#000000";

const primaryColorPaletteTeal = {
  900: {
    dark: { value: "#00251a", contrastText: whiteText },
    main: { value: "#004d40", contrastText: whiteText },
    light: { value: "#39796b", contrastText: whiteText },
  },
  800: {
    dark: { value: "#003d33", contrastText: whiteText },
    main: { value: "#00695c", contrastText: whiteText },
    light: { value: "#439889", contrastText: blackText },
  },
  700: {
    dark: { value: "#004c40", contrastText: whiteText },
    main: { value: "#00796b", contrastText: whiteText },
    light: { value: "#48a999", contrastText: blackText },
  },
  600: {
    dark: { value: "#005b4f", contrastText: whiteText },
    main: { value: "#00897b", contrastText: blackText },
    light: { value: "#4ebaaa", contrastText: blackText },
  },
  500: {
    dark: { value: "#00675b", contrastText: whiteText },
    main: { value: "#009688", contrastText: blackText },
    light: { value: "#52c7b8", contrastText: blackText },
  },
  400: {
    dark: { value: "#00766c", contrastText: whiteText },
    main: { value: "#26a69a", contrastText: blackText },
    light: { value: "#64d8cb", contrastText: blackText },
  },
  300: {
    dark: { value: "#00867d", contrastText: blackText },
    main: { value: "#4db6ac", contrastText: blackText },
    light: { value: "#82e9de", contrastText: blackText },
  },
  200: {
    dark: { value: "#4f9a94", contrastText: blackText },
    main: { value: "#80cbc4", contrastText: blackText },
    light: { value: "#b2fef7", contrastText: blackText },
  },
  100: {
    dark: { value: "#82ada9", contrastText: blackText },
    main: { value: "#b2dfdb", contrastText: blackText },
    light: { value: "#e5ffff", contrastText: blackText },
  },
  50: {
    dark: { value: "#aebfbe", contrastText: blackText },
    main: { value: "#e0f2f1", contrastText: blackText },
    light: { value: "#ffffff", contrastText: blackText },
  },
  A700: {
    dark: { value: "#008e76", contrastText: blackText },
    main: { value: "#00bfa5", contrastText: blackText },
    light: { value: "#5df2d6", contrastText: blackText },
  },
  A400: {
    dark: { value: "#00b686", contrastText: blackText },
    main: { value: "#1de9b6", contrastText: blackText },
    light: { value: "#6effe8", contrastText: blackText },
  },
  A200: {
    dark: { value: "#14cba8", contrastText: blackText },
    main: { value: "#64ffda", contrastText: blackText },
    light: { value: "#9effff", contrastText: blackText },
  },
  A100: {
    dark: { value: "#75ccb9", contrastText: blackText },
    main: { value: "#a7ffeb", contrastText: blackText },
    light: { value: "#dbffff", contrastText: blackText },
  },
};

const secondaryColorPaletteDeepOrange = {
  900: {
    dark: { value: "#870000", contrastText: whiteText },
    main: { value: "#bf360c", contrastText: whiteText },
    light: { value: "#f9683a", contrastText: blackText },
  },
  800: {
    dark: { value: "#9f0000", contrastText: whiteText },
    main: { value: "#d84315", contrastText: blackText },
    light: { value: "#ff7543", contrastText: blackText },
  },
  700: {
    dark: { value: "#ac0800", contrastText: whiteText },
    main: { value: "#e64a19", contrastText: blackText },
    light: { value: "#ff7d47", contrastText: blackText },
  },
  600: {
    dark: { value: "#b91400", contrastText: whiteText },
    main: { value: "#f4511e", contrastText: blackText },
    light: { value: "#ff844c", contrastText: blackText },
  },
  500: {
    dark: { value: "#c41c00", contrastText: whiteText },
    main: { value: "#ff5722", contrastText: blackText },
    light: { value: "#ff8a50", contrastText: blackText },
  },
  400: {
    dark: { value: "#c63f17", contrastText: whiteText },
    main: { value: "#ff7043", contrastText: blackText },
    light: { value: "#ffa270", contrastText: blackText },
  },
  300: {
    dark: { value: "#c75b39", contrastText: blackText },
    main: { value: "#ff8a65", contrastText: blackText },
    light: { value: "#ffbb93", contrastText: blackText },
  },
  200: {
    dark: { value: "#c97b63", contrastText: blackText },
    main: { value: "#ffab91", contrastText: blackText },
    light: { value: "#ffddc1", contrastText: blackText },
  },
  100: {
    dark: { value: "#cb9b8c", contrastText: blackText },
    main: { value: "#ffccbc", contrastText: blackText },
    light: { value: "#ffffee", contrastText: blackText },
  },
  50: {
    dark: { value: "#c8b7b5", contrastText: blackText },
    main: { value: "#fbe9e7", contrastText: blackText },
    light: { value: "#ffffff", contrastText: blackText },
  },
  A700: {
    dark: { value: "#a30000", contrastText: whiteText },
    main: { value: "#dd2c00", contrastText: whiteText },
    light: { value: "#ff6434", contrastText: blackText },
  },
  A400: {
    dark: { value: "#c30000", contrastText: whiteText },
    main: { value: "#ff3d00", contrastText: blackText },
    light: { value: "#ff7539", contrastText: blackText },
  },
  A200: {
    dark: { value: "#c53d13", contrastText: whiteText },
    main: { value: "#ff6e40", contrastText: blackText },
    light: { value: "#ffa06d", contrastText: blackText },
  },
  A100: {
    dark: { value: "#c96f53", contrastText: blackText },
    main: { value: "#ff9e80", contrastText: blackText },
    light: { value: "#ffd0b0", contrastText: blackText },
  },
};

const tertiaryColorPaletteGreen = {
  900: {
    dark: { value: "#003300", contrastText: whiteText },
    main: { value: "#1b5e20", contrastText: whiteText },
    light: { value: "#4c8c4a", contrastText: blackText },
  },
  800: {
    dark: { value: "#005005", contrastText: whiteText },
    main: { value: "#2e7d32", contrastText: whiteText },
    light: { value: "#60ad5e", contrastText: blackText },
  },
  700: {
    dark: { value: "#00600f", contrastText: whiteText },
    main: { value: "#388e3c", contrastText: blackText },
    light: { value: "#6abf69", contrastText: blackText },
  },
  600: {
    dark: { value: "#00701a", contrastText: whiteText },
    main: { value: "#43a047", contrastText: blackText },
    light: { value: "#76d275", contrastText: blackText },
  },
  500: {
    dark: { value: "#087f23", contrastText: whiteText },
    main: { value: "#4caf50", contrastText: blackText },
    light: { value: "#80e27e", contrastText: blackText },
  },
  400: {
    dark: { value: "#338a3e", contrastText: blackText },
    main: { value: "#66bb6a", contrastText: blackText },
    light: { value: "#98ee99", contrastText: blackText },
  },
  300: {
    dark: { value: "#519657", contrastText: blackText },
    main: { value: "#81c784", contrastText: blackText },
    light: { value: "#b2fab4", contrastText: blackText },
  },
  200: {
    dark: { value: "#75a478", contrastText: blackText },
    main: { value: "#a5d6a7", contrastText: blackText },
    light: { value: "#d7ffd9", contrastText: blackText },
  },
  100: {
    dark: { value: "#97b498", contrastText: blackText },
    main: { value: "#c8e6c9", contrastText: blackText },
    light: { value: "#d3ebd3", contrastText: blackText },
  },
  50: {
    dark: { value: "#b6c2b7", contrastText: blackText },
    main: { value: "#e8f5e9", contrastText: blackText },
    light: { value: "#ecf7ed", contrastText: blackText },
  },
  A700: {
    dark: { value: "#009624", contrastText: blackText },
    main: { value: "#00c853", contrastText: blackText },
    light: { value: "#5efc82", contrastText: blackText },
  },
  A400: {
    dark: { value: "#00b248", contrastText: blackText },
    main: { value: "#00e676", contrastText: blackText },
    light: { value: "#66ffa6", contrastText: blackText },
  },
  A200: {
    dark: { value: "#2bbd7e", contrastText: blackText },
    main: { value: "#69f0ae", contrastText: blackText },
    light: { value: "#9fffe0", contrastText: blackText },
  },
  A100: {
    dark: { value: "#88c399", contrastText: blackText },
    main: { value: "#b9f6ca", contrastText: blackText },
    light: { value: "#ecfffd", contrastText: blackText },
  },
};

export {
  primaryColorPaletteTeal,
  secondaryColorPaletteDeepOrange,
  tertiaryColorPaletteGreen,
};
