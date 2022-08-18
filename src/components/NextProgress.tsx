import { useTheme } from "@/providers/Theme";
import NPProgress from "nextjs-progressbar";

export default function NextProgress() {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  return <NPProgress color={color} />;
}
