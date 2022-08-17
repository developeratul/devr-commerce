import { useColorModeContext } from "@/providers/Theme";
import { darkTheme } from "@/styles/darkTheme";
import { lightTheme } from "@/styles/lightTheme";
import NPProgress from "nextjs-progressbar";

export default function NextProgress() {
  const { currentMode } = useColorModeContext();
  const color =
    currentMode === "dark" ? darkTheme.palette.primary.main : lightTheme.palette.primary.main;
  return <NPProgress color={color} />;
}
