import { createTheme, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
  }
}
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#22212C", paper: "#14141B", secondary: "#282a36" },
    primary: { main: "#ff79c6", dark: "#c94695", light: "#ffacf9" },
    secondary: { main: "#bd93f9", dark: "#8b65c6", light: "#f1c4ff" },
    info: { main: "#8be9fd", dark: "#56b7ca", light: "#c0ffff" },
    error: { main: "#ff5555", dark: "#c5162c", light: "#ff8982" },
    success: { main: "#50fa7b", dark: "#00c64c", light: "#8dffac" },
    warning: { main: "#ffb86c", dark: "#c9883e", light: "#ffea9c" },
    common: { white: "#f8f8f2" },
    text: {
      primary: "#f8f8f2",
      secondary: "#8a8f98",
      disabled: "#6272a4",
    },
    divider: "#6272a4",
  },
  typography: { fontFamily: "Poppins" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
  },
});
