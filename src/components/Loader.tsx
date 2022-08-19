import { Flex } from "@/styles";
import { CircularProgress, styled } from "@mui/material";

const LoaderContainer = styled(Flex)({
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
});
export default function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
}
