import { useCartStateContext } from "@/providers/Cart";
import { useColorModeContext } from "@/providers/Theme";
import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, styled, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));
const RightContent = styled(Box)({
  ...StyledToolbar,
});
const LeftContent = styled(Box)({
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
          <Typography variant="h6">DevR Commerce</Typography>
          <IconButton color="primary" onClick={toggleColorMode}>
            {currentMode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </LeftContent>
        <RightContent>
          <Link passHref href="/cart">
            <IconButton>
              <Badge badgeContent={cart?.total_items} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </RightContent>
      </StyledToolbar>
    </StyledAppBar>
  );
}
