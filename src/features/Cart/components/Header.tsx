import { useColorModeContext } from "@/providers/Theme";
import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import * as Mui from "@mui/material";
import Link from "next/link";
import { useCartStateContext } from "../Provider";

const StyledToolbar = Mui.styled(Mui.Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const StyledAppBar = Mui.styled(Mui.AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));
const RightContent = Mui.styled(Mui.Box)({
  ...StyledToolbar,
});
const LeftContent = Mui.styled(Mui.Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
});
export default function Header() {
  const { toggleColorMode, currentMode } = useColorModeContext();
  const { cart } = useCartStateContext();
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <LeftContent>
          <Link href="/" passHref scroll>
            <Mui.Typography variant="h6" sx={{ cursor: "pointer" }} color="text.primary">
              DevR Commerce
            </Mui.Typography>
          </Link>
          <Mui.IconButton color="primary" onClick={toggleColorMode}>
            {currentMode === "light" ? <DarkMode /> : <LightMode />}
          </Mui.IconButton>
        </LeftContent>
        <RightContent>
          <Link passHref href="/cart">
            <Mui.IconButton>
              <Mui.Badge badgeContent={cart?.total_items} color="primary">
                <ShoppingCart />
              </Mui.Badge>
            </Mui.IconButton>
          </Link>
        </RightContent>
      </StyledToolbar>
    </StyledAppBar>
  );
}
