import HeroImage from "@/assets/svg/hero.svg";
import { Flex } from "@/styles";
import { GitHub } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import Image from "next/image";

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "100px 0",
  gap: 5,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));
const LeftContent = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "600px",
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("md")]: {
    marginBottom: 50,
  },
}));
const RightContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    maxWidth: "400px",
  },
}));
export default function Hero() {
  return (
    <Container maxWidth="xl">
      <FlexContainer>
        <LeftContent>
          <Typography
            gutterBottom
            color="primary"
            sx={{ typography: { sm: "h4", xs: "h4", md: "h2" } }}
            component="h1"
          >
            DevR Commerce
          </Typography>
          <Typography
            gutterBottom
            sx={{ typography: { sm: "body1", xs: "body1", xl: "h6", md: "h6" } }}
            component="p"
            paragraph
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptates magnam aperiam
            amet? Ea iusto repudiandae corporis, animi excepturi non nostrum cupiditate ad! Est,
            nostrum!
          </Typography>
          <Flex gap={2}>
            <Button
              LinkComponent="a"
              href="#get_started"
              startIcon={<ArrowDownwardIcon />}
              variant="contained"
            >
              Get started
            </Button>
            <Button
              LinkComponent="a"
              href="https://github.com/ratul-devr/devr-commerce"
              target="_blank"
              startIcon={<GitHub />}
              variant="contained"
              color="secondary"
            >
              Star on github
            </Button>
          </Flex>
        </LeftContent>
        <RightContent display={{ xs: "none", md: "block" }}>
          <Image src={HeroImage} alt="Hero section illustration" loading="lazy" />
        </RightContent>
      </FlexContainer>
    </Container>
  );
}
