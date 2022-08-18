import { AppProps } from "@/types";
import { Box, styled } from "@mui/material";

const ContentContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});
export default function Content(props: AppProps) {
  const { children } = props;
  return <ContentContainer>{children}</ContentContainer>;
}
