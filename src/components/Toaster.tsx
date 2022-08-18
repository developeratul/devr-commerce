import { useTheme } from "@/providers/Theme";
import { Toaster as ToasterLib } from "react-hot-toast";

export default function Toaster() {
  const theme = useTheme();
  return (
    <ToasterLib
      position="bottom-right"
      toastOptions={{
        style: {
          background: theme.palette.background.secondary,
          color: theme.palette.text.primary,
        },
      }}
    />
  );
}
