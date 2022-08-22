import { darkTheme } from "@/styles/darkTheme";
import { lightTheme } from "@/styles/lightTheme";
import { AppProps } from "@/types";
import storage from "@/utils/storage";
import type { PaletteMode } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "color-mode";

type InitialState = { toggleColorMode: () => void; currentMode: PaletteMode };
export const ColorModeContext = createContext<InitialState>({
  toggleColorMode: () => null,
  currentMode: "dark",
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
          storage.setItem(STORAGE_KEY, newMode);
          return newMode;
        });
      },
      currentMode: mode,
    }),
    [mode]
  );
  useEffect(() => {
    setMode(storage.getItem(STORAGE_KEY) ?? "dark");
  }, []);
  return (
    <ColorModeContext.Provider value={values}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
export const useColorModeContext = () => useContext(ColorModeContext);
export const useTheme = () => {
  const { currentMode } = useColorModeContext();
  return currentMode === "light" ? lightTheme : darkTheme;
};
