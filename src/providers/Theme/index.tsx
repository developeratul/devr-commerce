import { AppProps } from "@/types";
import storage from "@/utils/storage";
import type { PaletteMode, Theme } from "@mui/material";
import { Box, createTheme, styled, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";

type InitialState = {
  toggleColorMode: () => void;
};

const AppContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  overflow: "auto",
});
export const ColorModeContext = createContext<InitialState>({ toggleColorMode: () => null });
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0E0E10", paper: "#18181B" },
    primary: { main: "#9246FF", dark: "#5C16C6", light: "#782CE8" },
  },
  typography: { fontFamily: "Poppins" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
  },
});
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#0E0E10", paper: "#18181B" },
    primary: { main: "#9246FF", dark: "#5C16C6", light: "#782CE8" },
  },
  typography: { fontFamily: "Poppins" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "capitalize" } },
    },
  },
});
export default function ThemeProvider(props: AppProps) {
  const { children } = props;
  const [mode, setMode] = useState<PaletteMode>("dark");
  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);
  const values = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          storage.setItem("color-mode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={values}>
      <MuiThemeProvider theme={theme}>
        <AppContainer bgcolor="background.default" color="text.primary">
          {children}
        </AppContainer>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
