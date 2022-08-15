import { DarkMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, styled, Toolbar, Typography } from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
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
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <LeftContent>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            DevR Commerce
          </Typography>
          <IconButton color="primary">
            <DarkMode />
          </IconButton>
        </LeftContent>

        <RightContent>
          <IconButton>
            <Badge badgeContent={4} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </RightContent>
      </StyledToolbar>
    </AppBar>
  );
}
