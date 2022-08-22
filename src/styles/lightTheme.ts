import { createTheme, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
  }
}
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#fff", paper: "#efefef", secondary: "#f7f7f7" },
    primary: { main: "#ea5cbc", dark: "#b5238c", light: "#ff8fef" },
    secondary: { main: "#8964ba", dark: "#59398a", light: "#bb92ed" },
    info: { main: "#8be9fd", dark: "#56b7ca", light: "#c0ffff" },
    error: { main: "#ff5555", dark: "#c5162c", light: "#ff8982" },
    success: { main: "#50fa7b", dark: "#00c64c", light: "#8dffac" },
    warning: { main: "#ffb86c", dark: "#c9883e", light: "#ffea9c" },
    common: { white: "#f8f8f2" },
    text: {
      primary: "#282a36",
      secondary: "#282a36",
      disabled: "#92a0d6",
    },
    divider: "#92a0d6",
  },
  typography: { fontFamily: "Poppins" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
  },
});
