import { createTheme, Theme } from "@mui/material";

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ff6dd1", dark: "#c937a0", light: "#ffa1ff" },
    secondary: { main: "#8b65c6", dark: "#5b3995", light: "#bd93f9" },
    info: { main: "#8be9fd", dark: "#56b7ca", light: "#c0ffff" },
    error: { main: "#ff5555", dark: "#c5162c", light: "#ff8982" },
    success: { main: "#50fa7b", dark: "#00c64c", light: "#8dffac" },
    warning: { main: "#ffb86c", dark: "#c9883e", light: "#ffea9c" },
    common: { white: "#f8f8f2" },
    divider: "#6272a4",
    text: {
      primary: "#303030",
      secondary: "#646464",
      disabled: "#6272a4",
    },
  },
  typography: { fontFamily: "Poppins" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
  },
});
