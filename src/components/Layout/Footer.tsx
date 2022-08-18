import { Paper, styled } from "@mui/material";

const FooterContainer = styled(Paper)(({ theme }) => ({
  padding: "20px 10px",
  marginTop: "auto",
  background: theme.palette.background.paper,
}));
export default function Footer() {
  return (
    <FooterContainer>
      <h1>Footer</h1>
    </FooterContainer>
  );
}
