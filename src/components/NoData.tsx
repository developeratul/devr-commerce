import EmptyCartImage from "@/assets/svg/empty_cart.svg";
import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";

type PropType = {
  title: string;
  description?: string;
};
const NoDataContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "100px 0",
});
export default function NoData(props: PropType) {
  const { title, description } = props;
  return (
    <NoDataContainer>
      <Image
        src={EmptyCartImage}
        alt={title}
        width={200}
        height={200}
        style={{ marginBottom: 20 }}
        loading="eager"
      />
      <Typography gutterBottom variant="h5" align="center">
        {title}
      </Typography>
      {description && (
        <Typography align="center" color="text.secondary">
          {description}
        </Typography>
      )}
    </NoDataContainer>
  );
}
