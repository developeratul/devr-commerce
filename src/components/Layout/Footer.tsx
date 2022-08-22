import { Flex } from "@/styles";
import { GitHub, LogoDev, Twitter } from "@mui/icons-material";
import * as Mui from "@mui/material";

const FooterContainer = Mui.styled(Mui.Box)(({ theme }) => ({
  padding: "20px 10px",
  marginTop: "auto",
  background: theme.palette.background.paper,
}));
export default function Footer() {
  return (
    <FooterContainer>
      <Mui.Container
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        maxWidth="xl"
      >
        <Mui.Typography>
          Designed and Developed with Next.js by{" "}
          <Mui.Link component="a" target="_blank" href="http://devr.netlify.app">
            DevR
          </Mui.Link>
        </Mui.Typography>
        <Flex justifyContent="space-between" alignItems="center" gap={3}>
          <Mui.IconButton
            LinkComponent="a"
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://github.com/ratul-devr"
          >
            <GitHub />
          </Mui.IconButton>
          <Mui.IconButton
            LinkComponent={"a"}
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://twitter.com/Ratul_devR"
          >
            <Twitter />
          </Mui.IconButton>
          <Mui.IconButton
            LinkComponent={"a"}
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://dev.to/ratuloss"
          >
            <LogoDev />
          </Mui.IconButton>
        </Flex>
      </Mui.Container>
    </FooterContainer>
  );
}
