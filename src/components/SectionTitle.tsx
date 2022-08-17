import { Box, styled, Typography } from "@mui/material";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

const SectionTitleContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: 50,
});
export default function SectionTitle(props: SectionTitleProps) {
  const { title, subtitle } = props;
  return (
    <SectionTitleContainer>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
    </SectionTitleContainer>
  );
}
