import { NoData } from "@/components";
import { useCartDispatchContext, useCartStateContext } from "@/providers/Cart";
import Cart from "@/services/cart";
import { Flex } from "@/styles";
import { Add, Delete, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  FormGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.secondary,
  borderRadius: 5,
  boxShadow: theme.shadows[1],
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));
const Quantity = styled(Typography)({ padding: "20px" });

export default function CartTable() {
  const { cart } = useCartStateContext();
  const { setCart } = useCartDispatchContext();
  const addQuantity = async (lineId: string, currentQty: number) => {
    const { cart } = await Cart.update(lineId, (currentQty += 1));
    setCart(cart);
  };
  const subQuantity = async (lineId: string, currentQty: number) => {
    const updatedQty = (currentQty -= 1);
    if (updatedQty <= 0) {
      const { cart } = await Cart.remove(lineId);
      setCart(cart);
      return;
    }
    const { cart } = await Cart.update(lineId, updatedQty);
    setCart(cart);
  };
  const removeFromCart = (lineId: string) => subQuantity(lineId, 0);
  if (!cart?.line_items.length) {
    return (
      <NoData
        title="Your cart is empty"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    );
  }
  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.line_items.map((item) => (
            <TableRow key={item.id}>
              <StyledTableCell sx={{ minWidth: 600 }}>
                <Flex gap={3}>
                  <Image
                    style={{ borderRadius: 5 }}
                    src={item.image?.url as string}
                    alt={item.name}
                    loading="eager"
                    width={150}
                    height={150}
                  />
                  <Box>
                    <Typography variant="h6" gutterBottom maxWidth={400}>
                      {item.name}
                    </Typography>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      color="error"
                      variant="outlined"
                      startIcon={<Delete />}
                    >
                      Remove
                    </Button>
                  </Box>
                </Flex>
              </StyledTableCell>
              <StyledTableCell sx={{ minWidth: 250 }}>
                <FormGroup row sx={{ display: "flex", alignItems: "center" }}>
                  <Button variant="outlined" onClick={() => addQuantity(item.id, item.quantity)}>
                    <Add />
                  </Button>
                  <Quantity>{item.quantity}</Quantity>
                  <Button variant="outlined" onClick={() => subQuantity(item.id, item.quantity)}>
                    <Remove />
                  </Button>
                </FormGroup>
              </StyledTableCell>
              <StyledTableCell>
                <Typography>{item.price.formatted_with_symbol}</Typography>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
