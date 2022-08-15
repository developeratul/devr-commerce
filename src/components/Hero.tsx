import HeroImage from "@/assets/svg/hero.svg";
import { Flex } from "@/styles";
import { GitHub } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import Image from "next/image";

const FlexContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "90vh",
});
const LeftContent = styled(Box)({
  width: "600px",
});
const RightContent = styled(Box)({});
export default function Hero() {
  return (
    <Container maxWidth="xl">
      <FlexContainer>
        <LeftContent>
          <Typography gutterBottom color="primary" variant="h2" component="h1">
            DevR Commerce
          </Typography>
          <Typography gutterBottom variant="h6" component="p" paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptates magnam aperiam
            amet? Ea iusto repudiandae corporis, animi excepturi non nostrum cupiditate ad! Est,
            nostrum!
          </Typography>
          <Flex gap={2}>
            <Button startIcon={<ArrowDownwardIcon />} variant="contained">
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
              Start on github
            </Button>
          </Flex>
        </LeftContent>
        <RightContent>
          <Image src={HeroImage} />
        </RightContent>
      </FlexContainer>
    </Container>
  );
}
