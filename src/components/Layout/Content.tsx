import { AppProps } from "@/types";
import { Box, styled } from "@mui/material";

const ContentContainer = styled(Box)({
  minHeight: "90vh",
});
export default function Content(props: AppProps) {
  const { children } = props;
  return <ContentContainer>{children}</ContentContainer>;
}
