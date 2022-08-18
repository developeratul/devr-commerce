import { AppProps } from "@/types";
import { Box, styled } from "@mui/material";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const LayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  margin: 0,
});
export default function Layout(props: AppProps) {
  const { children } = props;
  return (
    <LayoutContainer>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </LayoutContainer>
  );
}
